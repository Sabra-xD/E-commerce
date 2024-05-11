import { selectCurrentUser } from "../rtk/user/userSlice"
import {  useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { checkUserAdmin } from "../Utils/Utils";
import useSelectorWithDelay from "./useSelectorWithDelay";

//This checks if the user is an admin or not.
const useAdminAuth =  ()  => {

    const {currentUser,timerExpired} = useSelectorWithDelay(selectCurrentUser,3000);

    console.log("curentUser from the selector: ",currentUser);
    console.log("Timer: ",timerExpired);

    const navigator = useNavigate();


    useEffect(()=>{
        if(currentUser){
            if(!checkUserAdmin(currentUser)){
                console.log("User is not an admin");
                navigator('/');
            }

        }else{

            if(timerExpired){
                navigator('/')
            }
          
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentUser,timerExpired]);

    return currentUser;
}

export default useAdminAuth;


