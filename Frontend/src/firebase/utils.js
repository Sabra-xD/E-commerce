import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, doc, getDocs,addDoc,query, where, deleteDoc, startAfter, limit, getDoc } from 'firebase/firestore';
import { firebaseConfig } from './config.js';


const firebaseApp = initializeApp(firebaseConfig);
// Handing it the firebase app after handling configurations.
export const auth = getAuth(firebaseApp);

export const firestore = getFirestore(firebaseApp);

export const GoogleProvider = new GoogleAuthProvider();


//Saving the newely created account in our fireStore database.
//Create Account already checks if the email is already registered or not.

export const handleUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = doc(collection(firestore, "users"), uid); // Specify the collection name
  


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
      orderHistory: [],
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
if (querySnapshot.size > 0) {
  const firstDocData = querySnapshot.docs[0].data();
  return firstDocData;
} else {
  console.log("User not found with the provided uid.");
}
  }catch(err){
    console.log("Error in the fetch: ",err);
  }
};



export const handleAddProduct =  (product) =>{

  return new Promise( async(resolve,reject)=>{
    //To add the product to firestore.
    await addDoc(collection(firestore,"products"),product).then(()=>{
      resolve()
    }).catch(
      err => {
        reject(err);
      }
    )
  })
}

  // export const handleFetchProducts = async ({filterType,StartDoc,presistProduct=[]}) => {
  //   try {
  //     const pageSize = 6;
  //     const ref = collection(firestore, "products");

  //     const filterQuery = filterType ? where('productCategory', '==', filterType) : null;
  //     const StartDocQuery = StartDoc ? startAfter(StartDoc) : null;
  //     const q = query(ref,filterQuery,limit(pageSize));
      

  //    await getDocs(q).then((snapShot=>{
  //       const totalCount = snapShot.size;
  //       const data = [
  //         ...presistProduct,
  //         ...snapShot.docs.map(doc=>{
  //           return{
  //             ...doc.data(),
  //             documentID: doc.id,
            
  //           }
  //         })
  //       ];
        
  //       console.log("The product list: ",data,"queryDoc: ",snapShot.docs[totalCount-1],"Total Count: ",totalCount);

  //       return({
  //         data,
  //         queryDoc: snapShot.docs[totalCount - 1],
  //         isLastPage: totalCount < 1
  //       });

    
  //     })); 
    
      
  //  } catch (error) {
  //     console.error("Error fetching products:", error); // Use console.error for more detailed logging
  //     throw error; // Re-throw the error to allow upper-level handling
  //   }
  // };


  export const handleFetchProductWithID = async (documentID) => {

    try {
      // Reference the document directly using doc
      const productRef = doc(firestore, "products", documentID);
  
      // Get a document snapshot
      const productSnapShot = await getDoc(productRef);
  
      if (productSnapShot.exists) {
        // Document found, get data
        const product = productSnapShot.data();
        return product;
      } else {
        // Document not found, handle the case (optional)
        return null; // Or throw an error if needed
      }
  
    } catch (error) {
      console.error("Error in handleFetchProductWithID:", error);
    }
  };
  
  
  export const handleFetchProducts = async ({ filterType, StartDoc, presistProduct = [] }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pageSize = 6;
        const ref = collection(firestore, "products");
  
        const filterQuery = filterType ? where('productCategory', '==', filterType) : null;
        let q;
        if(StartDoc){
          const StartDocQuery = startAfter(StartDoc);
         q = query(ref, filterQuery, StartDocQuery,limit(pageSize));

        }else{
          q = query(ref, filterQuery, limit(pageSize));
        }
  
        const snapShot = await getDocs(q);
        const totalCount = snapShot.size;
        const data = [
          ...presistProduct,
          ...snapShot.docs.map(doc => {
            return {
              ...doc.data(),
              documentID: doc.id,
            }
          })
        ];
  
  
        resolve({
          data,
          queryDoc: snapShot.docs[totalCount - 1],
          isLastPage: totalCount < 1
        });
      } catch (error) {
        console.error("Error fetching products:", error);
        reject(error);
      }
    });
  };
  



export const deleteProduct = async (documentId) => {
  try {
    const productRef = doc(collection(firestore, 'products'), documentId);
    await deleteDoc(productRef);
    return true
  } catch (error) {
    console.error("Error deleting document:", error);
    return false;
  }
};