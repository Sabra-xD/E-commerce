import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, fetchUserInfo, GoogleProvider, handleUserProfile } from "../../firebase/utils";
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

    setUser: (state, action) => {
      if (action.payload.user === null) {
        state.user = null;
      } else {
        const { displayName, email, photoURL, uid, idToken, userRoles } = action.payload.user;
        const userData = {
          displayName,
          email,
          id: uid,
          userRoles: userRoles,
          tokenId: idToken,
          photo: photoURL,
        };
        saveUserInfo(userData);
        state.user = userData;
      }

      console.log("User inside the setUser: ",action.payload.user);

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
export const selectCurrentUser = (state) => {
  console.log("The user state inside the selectCurrentUser: ",state.user.user);
  return state.user.user
};



export const signInWithEmailAndPasswordController = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }, { dispatch }) => {
    try {
      // Default Authentication in Firebase
      const res = await signInWithEmailAndPassword(auth, email, password);

      // Fetching userInfo from the fireStore (no dispatch here)
      const userInfo = await fetchUserInfo(res.user); // Assuming `res` is available from the previous line

      if (!userInfo) {
        dispatch(signInError('Something went wrong'));
        return false;
      }

      // Fetching userInfo from the fireStore.
      console.log("User info inside the signIn: ", userInfo);
      const userData = {
        user: {
          displayName: userInfo.displayName,
          email: userInfo.email,
          userRoles: userInfo.userRoles,
          photoURL: '',
          uid: userInfo.uid,
          idToken: res.user.accessToken,
        }
      };

      dispatch(setUser(userData));
      dispatch(signInSuccess(true));
      return true;
    } catch (error) {
      console.error("Error signing in with Email and Password:", error);
      dispatch(signInError(error.code || 'An unknown error occurred'));
      throw error;
    }
  }
);


// export const signInWithEmailAndPasswordController =  (email, password) => async (dispatch) => {
//   try {
//     // Default Authentication in Firebase
//    const res = await signInWithEmailAndPassword(auth, email, password);

//     // Fetching userInfo from the fireStore (no dispatch here)
//     const userInfo = await fetchUserInfo(res.user); // Assuming `res` is available from the previous line

//     if (!userInfo) {
//       dispatch(signInError('Something went wrong')); // Dispatch error if user info not found
//       return;
//     }
//       //Fetching userInfo from the fireStore.
//         if(userInfo){
//           console.log("User info inside the signIN: ",userInfo);
//           const userData = {
//           user: {
//             displayName: userInfo.displayName,
//             email: userInfo.email,
//             userRoles: userInfo.userRoles,
//             photoURL: '',
//             uid: userInfo.uid,
//             idToken: res.user.accessToken,
//           }
//         };

//         dispatch(setUser(userData));
//         dispatch(signInSuccess(true));
//         dispatch(signInError(''));
//       }else{
//         dispatch(signInError('Something went wrong'));
//       }
//       }

//   catch (error) {
//     console.error("Error signing in with Email and Password:", error);
//     dispatch(signInError(error.code || 'An unknown error occurred')); // Dispatch error message
//   }
// };


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
  console.log("The user data we're saving: ",userData);
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
    await createUserWithEmailAndPassword(auth, email, password).then(async (response)=>{
      const userData = {
        user: {
          displayName: displayName,
          email: email,
          photoURL: '',
          uid: response.user.uid,
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
