import { createSlice } from "@reduxjs/toolkit";
import { auth, GoogleProvider } from "../../firebase/utils";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

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
    nullifyUser: (state, action) => {
      state.user = null;
    },
    setUser: (state, action) => {
      if (action.payload.user === null) {
        state.user = null;
      } else {
        const { displayName, email, photoURL, uid, idToken } = action.payload.user;

        const userData = {
          displayName,
          email,
          id: uid,
          tokenId: idToken,
          photo: photoURL,
        };
        saveUserInfo(userData);
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
      console.log("Non-Serializable Action?: ",action.payload);
      state.signUpError = action.payload;
    }
  },
});

export const { signInSuccess, signInError, setUser, signUpError,signUpSucess } = userSlice.actions;
export default userSlice.reducer;
export const selectSignInSuccess = (state) => state.user.signInSuccess;
export const selectSignUpSuccess = (state) => state.user.signUpSucess;



export const signInWithEmailAndPasswordController = (email, password)=> async(dispatch) =>{
  try {
    await signInWithEmailAndPassword(auth, email, password).then(
      (res)=>{
        const userData = {
          user: {
            displayName: '',
            email: res.user.email,
            photoURL: '',
            uid: res.user.uid,
            idToken: res.user.accessToken,
          }
        };
        dispatch(setUser(userData));
        dispatch(signInSuccess(true));
        dispatch(signInError(''));
      }
    ).catch((err)=>{
      console.log("Error in the sign in with email and password: ",err);
      dispatch(signInError(err.code));
    });
  } catch (error) {
    console.error("Error signing in with Email and Password:", error);
  }
};

export const signInWithGoogle = async (dispatch) => {
  try {
    const response = await signInWithPopup(auth, GoogleProvider);
    dispatch(signInSuccess(true));
    dispatch(signUpSucess(true));
    dispatch(setUser(response));
  } catch (error) {
    console.error("Error signing in with Google:", error);
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
  }
};

export const logOut = async (dispatch) => {
  try {
    await auth.signOut();
    localStorage.clear();
    dispatch(setUser({ user: null }));
    dispatch(signInSuccess(false));
    dispatch(signUpSucess(false));
  } catch (error) {
    console.error("Error in the LogOut: ", error);
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
    await createUserWithEmailAndPassword(auth, email, password).then((response)=>{
      const userData = {
        user: {
          displayName: displayName,
          email: email,
          photoURL: '',
          uid: response.user.uid,
          idToken: response.user.accessToken,
        }
      };

      dispatch(setUser(userData));
      dispatch(signUpError(''));
      dispatch(signUpSucess(true));
    
    });
  
  } catch (error) {
    console.error("Error creating account:", error);
    dispatch(signUpError(error.code));
  }
};


export const resetPassword = async(email) =>{
  console.log("Inside the resetPassword Function");
  try{
    await sendPasswordResetEmail(auth,email).then((res)=>{
      console.log("Res",res);
    }).catch((err)=>{
      console.log("Error in the resetPassword",err);
    });
  }catch(err){
    console.log("Error in the resetPassword: ",err);
  }
}
