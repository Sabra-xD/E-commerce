import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../rtk/user/userSlice";
import { checkUserAdmin } from "../../Utils/Utils";
import { Link } from "react-router-dom";
import "./styles.scss";




const AdminToolbar = () =>{

    const currentUser = useSelector(selectCurrentUser);

    const isAdmin = checkUserAdmin(currentUser);
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