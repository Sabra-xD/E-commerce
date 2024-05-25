import { selectCurrentUser } from "../rtk/user/userSlice"
import {  useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import useSelectorWithDelay from "./useSelectorWithDelay";

//This checks if the user is an admin or not.
const useAuth =  ()  => {

    const {currentUser,timerExpired} = useSelectorWithDelay(selectCurrentUser,1000);


    const navigator = useNavigate();


    useEffect(()=>{
        
        //If no user, navigate to the login page.
       if(!currentUser && timerExpired){
        navigator('/login');
       }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentUser,timerExpired]);

    return currentUser;
}

export default useAuth;


