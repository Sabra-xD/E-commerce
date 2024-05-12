
import AdminNavBar from "../AdminNavBar.js";
import AddProduct from "./AddNewProduct/AddProduct.js";
import "./styles.scss";
const Admin = () => {
  
    return(
        <>
            <div className="admin">
                
                <div className="NavBarContainer">
                    <AdminNavBar />
                </div>

                <div className="AddProductContainer">
                    <AddProduct />
                    <h1>Cards displayed here</h1>

                </div>
            </div>
        </>
    )
}


export default Admin;