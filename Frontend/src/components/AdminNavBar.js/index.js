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
        <p>Circular Image</p>
                
                <h3>{currentUser?.displayName}</h3> 
    
                <hr className="divider"/>

                <Link to="/">Home</Link>
                
                <hr className="divider"/>
    
                <Button onClick={()=>{
                    //Go to the billing information page
                    navigator("/delivery-information");
                }}>Update Delivery information</Button>
    
                <hr className="divider"/>
    
                <Button>Sign Out</Button>
                
        </div>
            
               

    );
    

}


export default AdminNavBar;