import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, doc, getDocs,addDoc,query, where } from 'firebase/firestore';
import { firebaseConfig } from './config.js';
import { productSlice } from '../rtk/products/productSlice.js';


const firebaseApp = initializeApp(firebaseConfig);
// Handing it the firebase app after handling configurations.
export const auth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);

export const GoogleProvider = new GoogleAuthProvider();


//Saving the newely created account in our fireStore database.
//Create Account already checks if the email is already registered or not.

export const handleUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const { uid } = userAuth;

  // Using collectionRef.doc() for Firestore v9+
  console.log("UserAuth: ",uid);
  console.log("The uid is: ",uid);
  const userRef = doc(collection(firestore, "users"), uid); // Specify the collection name
  
  console.log("The userRef: ",userRef);

  const querySnapshot = await getDocs(collection(firestore, "users"),uid);
  console.log("Query snapshot: ",querySnapshot);
  // const snapshot = await userRef.get();

  const { displayName, email } = userAuth;
  const timestamp = new Date();
  const userRoles = ['user'];
  try {
    //Adding the user to the database
    await addDoc(collection(firestore,"users"),{
      displayName,
      email,
      userRoles,
      uid: uid,
      createdDate: timestamp,
      ...additionalData
    });
  } catch (err) {
    console.log("Error in the handleUserProfile: ",err);
  }

  return userRef;
};

//Fetching Logged in user Information based on their uid.
export const fetchUserInfo = async (userAuth) => {
  if (!userAuth) return;
  const { uid } = userAuth;
  const userRef = collection(firestore,"users");
  try{
    const q = query(userRef, where("uid", "==", `${uid}`));
    const querySnapshot = await getDocs(q);
if (querySnapshot.size > 0) { // Check if there are any documents
  const firstDocData = querySnapshot.docs[0].data();
  console.log("First Document Data:", firstDocData);
  return firstDocData;
} else {
  console.log("User not found with the provided uid.");
}
  }catch(err){
    console.log("Error in the fetch: ",err);
  }
};



// export const handleAddProduct = product => {

//   return new Promise((resolve,reject)=>{

//   })

// }


