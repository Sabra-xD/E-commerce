  require('dotenv').config();

  const express = require('express');
  
  const app = express();
  const firebase = require('firebase-admin');
  const cors = require("cors");
  const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
  app.use(express.json()); 
  app.use(
    cors({
      origin: "*",
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
      } catch (error) {
        console.error("Error deleting document:", id, error);
      }
    }
  }

  app.post("/create-checkout-session", async (req, res) => {
    try {
      const productIds = req.body.items.map(item => item.documentID); 
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
        // Redirect the user to different URLs based on success or cancelation
        success_url: `${process.env.CLIENT_URL}/success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
      });
      console.log("The session url: ",session.url);
      res.json({ url: session.url });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  
  // Route to handle successful payment
app.post("/success/:session_id", async (req, res) => {
  console.log("sucess was called ");
  try {
    const { session_id } = req.params;
    
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === 'paid') {
      // Access the order, send its documentIDs and delete them.
      const productIds = req.body.products.map(item => item.documentID);
      await deleteDocuments(productIds);
      console.log("It is done");
      return res.status(200).json({ message: 'Payment successful and products deleted' });
    } else {
      return res.status(400).json({ error: 'Payment not completed successfully' });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


  // Route to handle canceled payment
  app.get("/fail", (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/cancel`);
  });
  
  
  app.listen(5000);
  