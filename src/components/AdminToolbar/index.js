import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../rtk/user/userSlice";
import { checkUserAdmin } from "../../Utils/Utils";
import { Link } from "react-router-dom";
import "./styles.scss";




const AdminToolbar = () =>{
    console.log("Inside the AdminToolBar");

    const currentUser = useSelector(selectCurrentUser);

    const isAdmin = checkUserAdmin(currentUser);
    console.log("Is the user an admin? ",isAdmin);
    if(!isAdmin) return null;
    return(
    <div className="adminToolbar">
      <ul>
        <li>
          <Link to="/admin">
            Admin
          </Link>
        </li>
      </ul>
    </div>
    );
}

export default AdminToolbar;