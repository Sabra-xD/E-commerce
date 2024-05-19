  require('dotenv').config();

  const express = require('express');
  
  const app = express();
  const firebase = require('firebase-admin');
  const cors = require("cors");
  const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
  app.use(express.json()); 
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  )
  
  firebase.initializeApp({
    credential: firebase.credential.cert(require("./key/key.json"))
  });
  const firestore = firebase.firestore();
  
  async function fetchDocuments(productIds) {

    const documents = [];
    for (const id of productIds) {
      try {
        const docRef = firestore.collection("products").doc(id);
        const docSnap = await docRef.get();
        if (docSnap.exists) {
          documents.push(docSnap.data());
        } else {
          console.log("Document not found:", id);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    }
    return documents;

  }


  async function deleteDocuments(productIds) {
    for (const id of productIds) {
      try {
        const docRef = firestore.collection("products").doc(id);
        await docRef.delete();
        console.log("Document deleted:", id);
      } catch (error) {
        console.error("Error deleting document:", id, error);
      }
    }
  }

  app.post("/create-checkout-session", async (req, res) => {
    try {
      const productIds = req.body.items.map(item => item.documentID); // Extract document IDs
      const products = await fetchDocuments(productIds);
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: products.map(product => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: product.productName, 
            },
            unit_amount: product.productPrice * 100,
          },
          quantity: 1,
        })),
        //Re-route the user to something decent.
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/fail`,
      })
      await deleteDocuments(productIds);
      res.json({ url: session.url })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })
  
  app.listen(5000);
  