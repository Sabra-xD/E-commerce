import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../rtk/user/userSlice";
import { Link, useNavigate } from "react-router-dom";

import "./styles.scss";
import Button from "../Form/Button";


const AdminNavBar = () => {

    const currentUser = useSelector(selectCurrentUser);
    const navigator = useNavigate();
    
    return(

<div className="sideBar">

                
                <h3>{currentUser?.displayName}</h3> 
    
                <hr className="divider"/>

                <Link to="/">Home</Link>
                
                <hr className="divider"/>
    
                <Button onClick={()=>{
                    navigator("/delivery-information");
                }}>Update Delivery information</Button>
    
    
                
        </div>
            
               

    );
    

}


export default AdminNavBar;