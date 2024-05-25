
import useSelectorWithDelay from "../../customHooks/useSelectorWithDelay";
import { useNavigate } from "react-router-dom";

const { selectCurrentUser } = require("../../rtk/user/userSlice");




const CurrentUser = ()=>{

    const {currentUser, timerExpired} = useSelectorWithDelay(selectCurrentUser,3000);

    const navigator = useNavigate();

    if(timerExpired){
        navigator.push('/login');
    }

 
    return(
        <>
        <p>Name: {currentUser?.displayName}</p>
        <p>Email: {currentUser?.email}</p>
        </>
    );
}



export default CurrentUser;