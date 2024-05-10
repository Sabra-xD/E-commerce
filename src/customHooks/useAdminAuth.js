import { useSelector } from "react-redux"
import { selectCurrentUser, selectSignInSuccess } from "../rtk/user/userSlice"
import {  useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { checkUserAdmin } from "../Utils/Utils";

//This checks if the user is an admin or not.
const useAdminAuth =  async()  => {
   const signInSuccess = useSelector(selectSignInSuccess);
    const currentUser =   useSelector(state=>state.user.user);
    console.log("Sign IN Sucess: ",signInSuccess);
    console.log("curentUser from the selector: ",currentUser);
    const navigator = useNavigate();


    useEffect(()=>{
      
        if(!checkUserAdmin(currentUser)){
            console.log("User is not an admin");
            navigator('/');
        }



    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentUser]);

    return currentUser;
}

export default useAdminAuth;


