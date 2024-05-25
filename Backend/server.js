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
    credential: firebase.credential.cert(require({
      "type": "service_account",
      "project_id": "ecommerce-745f5",
      "private_key_id": "084e0e74d8e81b9791d143451565d21d316141a4",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCsJ9yvyuUVd9/V\nCr604FBdVCflTUezPLdYtKX5YO5jKpUFoMNpOEo3IIpOfTIZsE8i/lR96MTWFr/Y\nNoUKdUSjwl/Y2S5KSJkDi/4V4z1MsK4yaHCoI7hDBlpp2SAa97O1AGNZAOC9/onU\nY7tQ71jqy6AwLxCGXNtIewDNI7jQWcNaXG2pxqDgICt8b/WZjkWWu/vjIFCWQflY\nqTAB4kq433TO4Uu0G/KBGLBnAmpRCxRLu7KNkTrL77W0FSEZggl4sp1KSVBEeZlJ\nI0g8dtaToJLG2qenLUeWUqh+lQ4aaKupk6R00fCT/uVW7axVDdHleBjZ9u95E+79\nAiv4lWiFAgMBAAECggEABpiUZQviERuBsPjza5y4l4rU6H04hQ6Le9OYFGD5YUVN\nZmTNd+eXOFt/0RgM5l0R+yZBeH2FpSpD+XXFTSxHD/svjvBrTJ9RdYhUmOQXAiw2\n0Gmd/2M2+SJyLmIKT94zvXihVdSpx73L7B5SG/y/rGdW4OG8wVkncbR8yF9ZAmqN\n6aSFCRUJJYQVcUsPWS9cn9Jep0LNAoRUkUmdh7g2anxIhUrz1YOelc9qaMeNFKSy\nTjEaJL2ntgstIpO4qhcBuZlEyY26ZfxLBfVpZUr37aBV3L915RRESXdK2PPZI5sL\ns1L0afeRsL+5sniPLTsHLTmPJqtGfGd/QR9Vh5knAQKBgQDf+/Ujhetzv/C6Hna9\n+pyeNqaeBfzwfsE8R6p7iCdJ5HlpY4ya4/pZOBiAo2fyMw/Tk9nNpQ79L/am8YSV\nQzpilCq5YHm96ZQnW3mKxlNVNB+PtX+LOYhW4K/QUnrLeQnvZpwAUjd+UwN4sb4S\nuoYEtEQ2YICjc7JqVdCl8IiWQQKBgQDEw2Sr87pTGOxc8Dj5M55hApg5TQjXI3+b\nxGkpLPy/gnXYsNA+LAuRL+usBeA33i6+VXUuBf5E+wDJqX/NNQa6Tb7NgItfADDj\nX+f/C95CACcKgHM1P9oFBmytH7IOfKYR9wx3SNY5iVNC0z3ovUZovojFmVRU0k4U\ni5tIW5SpRQKBgQCKjzVAunHDczOaD4ppUAVfInPEQfQNWnxzq+nc7YdQgNRSy9CJ\naQrP8pHF0lBVVh0uR8JvIvK40dkFwVbBd4tAvGQJtZLaVwrdpgr0PGgEx2/W2PKD\n0B11kR1yA/QOt1vcC1/qGvJVZUk6esoYj+akNlgUQ3KQqtvuSBQA82GrgQKBgQCZ\nAqmC3mICxNrp2xUzFWUQY4gk5zb8tmpBo5dzobxa4QTroXQPJQlJuk4208rtJyaK\ndMJPK/Hzio2uRNVRqu60akj6XgADvI5IAwjSWVRZVu0FSaZNvn24cqqIZqF8iopK\nZieXi1isHZJV4Re/qZDbW2/Y2ceuvmxhpb73oeAVUQKBgCQwW+wNsHsRWMLp5BMw\n9TRv6Rt0D+pBMXqOU2jpCvVA6DjhAWumaMQcySCywvgUbELFifqIetipISsfb2m8\nktywClnXrAm66f2EGJueM5YWgESiO6CYsit1cx53Cnh2vOP51F74D0/vBxQJRW1F\nKsFFsTOdgkxCSpb1G+OCaQnP\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-asieb@ecommerce-745f5.iam.gserviceaccount.com",
      "client_id": "100045726964306220218",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-asieb%40ecommerce-745f5.iam.gserviceaccount.com",
      
      "universe_domain": "googleapis.com"
    }
    ))
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
      const productIds = req.body.items.map(item => item.documentID); 
      console.log("The request body items: ",req.body.items);
      const products = await fetchDocuments(productIds);
      console.log("The productIDs: ",productIds);
      console.log("The products: ",products);
  
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
  try {
    const { session_id } = req.params;
    console.log("The req: ", req.body);
    
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === 'paid') {
      // Access the order, send its documentIDs and delete them.
      const productIds = req.body.products.map(item => item.documentID);
      console.log("The productIDS in the success: ", productIds);
      await deleteDocuments(productIds);

      return res.status(200).json({ message: 'Payment successful and products deleted' });
    } else {
      return res.status(400).json({ error: 'Payment not completed successfully' });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


  // Route to handle canceled payment
  app.get("/cancel", (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/cancel`);
  });
  
  
  app.listen(5000);
  