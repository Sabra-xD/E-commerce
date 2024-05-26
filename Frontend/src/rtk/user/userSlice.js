import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearCart } from "../cart/cartSlice";
import { auth, fetchUserInfo, firestore, GoogleProvider, handleUserProfile } from "../../firebase/utils";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { setOrderHistory } from "../orders/orderSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    signInSuccess: false,
    signInError: '',
    signUpError: '',
    signUpSucess: false,
  },
  reducers: {

    setUser: (state, action) => {
      if (action.payload.user === null) {
        state.user = null;
      } else {
        const { displayName, email, photoURL, uid, idToken, userRoles,orderHistory,deliveryInfo } = action.payload.user;
        const userData = {
          displayName,
          email,
          uid: uid,
          userRoles: userRoles,
          tokenId: idToken,
          photo: photoURL,
          orderHistory: orderHistory,
          deliveryInfo: deliveryInfo,
        };
        saveUserInfo(action.payload.user);
        state.user = userData;
      }
    },
    signInSuccess: (state, action) => {
      state.signInSuccess = action.payload;
    },
    signInError: (state, action) => {
      state.signInError = action.payload;
    },
    signUpSucess:(state,action)=>{
      state.signUpSucess = action.payload;
    },
    signUpError: (state,action) => {
      state.signUpError = action.payload;
    }
  },
});

export const { signInSuccess, signInError, setUser, signUpError,signUpSucess } = userSlice.actions;
export default userSlice.reducer;
export const selectSignInSuccess = (state) => state.user.signInSuccess;
export const selectSignUpSuccess = (state) => state.user.signUpSucess;
export const selectCurrentUser = (state) => {
  return state.user.user
};

//Authentication


export const signInWithEmailAndPasswordController = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }, { dispatch }) => {
    try {

      const res = await signInWithEmailAndPassword(auth, email, password);

      const userInfo = await fetchUserInfo(res.user); 

      if (!userInfo) {
        dispatch(signInError('Something went wrong'));
        return false;
      }
      const userData = {
        user: {
          displayName: userInfo.displayName,
          email: userInfo.email,
          userRoles: userInfo.userRoles,
          photoURL: '',
          uid: userInfo.uid,
          orderHistory: userInfo.orderHistory,
          deliveryInfo: userInfo.deliveryInfo,
          idToken: res.user.accessToken,

        }
      };

      dispatch(setUser(userData));
      dispatch(setOrderHistory(userInfo.orderHistory));
      
      dispatch(signInSuccess(true));
      return true;
    } catch (error) {
      console.error("Error signing in with Email and Password:", error);
      dispatch(signInError(error.code || 'An unknown error occurred'));
      throw error;
    }
  }
);

export const signInWithGoogle = async (dispatch) => {
  try {
    const response = await signInWithPopup(auth, GoogleProvider);
    const user = response.user;
    const userDocRef = doc(firestore, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      dispatch(setUser(userData));
    } else {
      
      const newUser = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
        userRoles: ['user'], 
        orderHistory: [], 
        deliveryInfo: {} 
      };
      await setDoc(userDocRef, newUser);
      dispatch(setUser(newUser));
    }

    dispatch(signInSuccess(true));
    dispatch(signUpSucess(true));
  } catch (error) {
    console.error("Error signing in with Google:", error);
    
  }
};

export const createAccount =  (email, password, confirmPass, displayName) => async (dispatch) => {
  if(password!==confirmPass){
    dispatch(signUpError("Password mis-match"));
    return;
  }

  if(displayName===''){
    dispatch(signUpError("Please set your name"));
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password).then(async (response)=>{
      
      const userData = {
        user: {
          displayName: displayName,
          email: email,
          photoURL: '',
          uid: response.user.uid,
          orderHistory: [],
          deliveryInfo: {},
          idToken: response.user.accessToken,
        }
      };
    
      //Saving user to the dataBase.
      await handleUserProfile(response.user,{displayName});
      
      //Setting User State locally.
      dispatch(setUser(userData));
      dispatch(signUpError(''));
      dispatch(signUpSucess(true));
    
    });
  
  } catch (error) {
    console.error("Error creating account:", error);
    dispatch(signUpError(error.code));
  }
};

const saveUserInfo = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};

export const readUserInfo = (dispatch) => {
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);


  if (userData) {
    dispatch(setUser({ user: userData }));
    return true;
  }
  return false;
};

export const logOut = async (dispatch) => {
  try {
    localStorage.clear();
    dispatch(setUser({ user: null }));
    dispatch(signInSuccess(false));
    dispatch(signUpSucess(false));
    dispatch(clearCart());
    await auth.signOut();
   
  } catch (error) {
    console.error("Error in the LogOut: ", error);
  }
};

export const resetPassword = async(email) =>{
  try{
    await sendPasswordResetEmail(auth,email).then((res)=>{
    }).catch((err)=>{
      console.log("Error in the resetPassword",err);
    });
  }catch(err){
    console.log("Error in the resetPassword: ",err);
  }
}