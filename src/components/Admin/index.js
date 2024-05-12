
import { useDispatch, useSelector } from "react-redux";
import AdminNavBar from "../AdminNavBar.js";
import AddProduct from "./AddNewProduct/AddProduct.js";
import "./styles.scss";
import { fetchProductsController, getAllProducts } from "../../rtk/products/productSlice.js";
import { useEffect } from "react";
const Admin = () => {
    const productsList = useSelector(getAllProducts);

    
    useEffect(()=>{
        //Get products from firebase and updating it to the database. Most likely, we'll remove it and continue with the state.
        console.log("The get all products response from the entire page: ",productsList);
      },[productsList]);



    return(
        <>
            <div className="admin">
                
                <div className="NavBarContainer">
                    <AdminNavBar />
                </div>

                <div className="AddProductContainer">
                    <AddProduct />
                    <div>
                        {productsList?.length > 0 ? (<><h3>There are products and there count is: {productsList.length}</h3></>) : (<>There are no products</>)};
                    </div>

                </div>
            </div>
        </>
    )
}


export default Admin;