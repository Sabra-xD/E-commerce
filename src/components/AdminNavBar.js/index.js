import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../rtk/user/userSlice";
import { Link } from "react-router-dom";

import "../Admin/styles.scss";


const AdminNavBar = () => {

    const currentUser = useSelector(selectCurrentUser);
    
    return(
        <>
      

            <div style={{"display":"flex","justifyContent":"center",}}>
               
               <p>Image</p>
                
           
               </div>


            <div style={{"display":"flex","justifyContent":"center",}}>
            <h3>{currentUser?.displayName}</h3>
            </div>

            <hr className="divider"/>
            <div style={{"display":"flex","justifyContent":"center",}}>
            <Link to="/">Home</Link>

            </div>
            <hr className="divider"/>

            
            <div style={{"display":"flex","justifyContent":"center",}}>
            <button>Sign Out</button>

            </div>

        </>
    );
    

}


export default AdminNavBar;