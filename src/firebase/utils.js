import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './config.js';

const firebaseApp = initializeApp(firebaseConfig);
//Handing it the firebase app after chandling configurations.
export const auth = getAuth(firebaseApp);

// const firestore = getFirestore(firebaseApp);

export const GoogleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    //   What serverice are we using and the provider.

  signInWithPopup(auth, GoogleProvider)
  .then((res)=>{
    console.log("Response: ",res);
  })
    .catch(error => {
      // Handle any errors here
      console.error("Error signing in with Google:", error);
    });
};

// export { auth, firestore }; // Exporting auth and firestore for other modules to use
