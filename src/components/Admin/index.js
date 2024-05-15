import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import AdminNavBar from "../AdminNavBar.js";
import AddProduct from "./AddNewProduct/AddProduct.js";
import "./styles.scss";
import { deleteProductController, fetchProductsController, getAllProducts } from "../../rtk/products/productSlice.js";
import { selectCurrentUser } from "../../rtk/user/userSlice.js";
import Button from "../Form/Button/index.js";
import Alert from '../Alert/index.js'; 
import LoadMore from '../LoadMore/LoadMore.js';

const Admin = () => {
    const [showAlert, setShowAlert] = useState(false);
    const products = useSelector(getAllProducts);
    const { data, queryDoc, isLastPage } = products;
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    useEffect(() => {


        dispatch(fetchProductsController(user,{filterType:''}));


    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleDelete = (documentID) => {
        dispatch(deleteProductController(user, documentID))
            .then(() => {
                setShowAlert(true); // Show alert after successful deletion
                setTimeout(() => {
                    setShowAlert(false); // Hide alert after 1 second
                }, 1000);
                dispatch(fetchProductsController(user,{filterType:''}));
            })
            .catch((error) => {
                console.log("Error deleting product:", error);
                // Handle error if deletion fails
            });
    };

    const handleLoadMore = () => {
        //Include the start query and presistent data.
        //We send the current data, since Start Doc is supposdly fetching new data.
        console.log("Dispatched HandleLoadMore")
        dispatch(fetchProductsController(user,{filterType:'',StartDoc:queryDoc,presistProduct:data}));
      }

      const configLoadMore= {
        onLoadMoreEvt: handleLoadMore,
      }

    return (
        
            <>
              <div className="admin">
                <div className="NavBarContainer">
                  <AdminNavBar />
                </div>
                <div className="AddProductContainer">
                  <AddProduct />
          
                  <div className="manageProducts">
          
                    <table border="0" cellPadding="0" cellSpacing="0">
                      <tbody>
                        <tr>
                          <th>
                            <h1>Manage Products</h1>
                          </th>
                        </tr>
                        <tr>
                          <td>
                            <table className="results" border="0" cellPadding="10" cellSpacing="0">
                              <tbody>
                                {Array.isArray(data) && data.length > 0 && data.map((product, index) => {
                                  const {
                                    productName,
                                    productPhoto,
                                    productPrice,
                                    // Use this when deleting the product.
                                    documentID,
                                  } = product;
          
                                  return (
                                    <tr key={index}>
                                      <td>
                                        <img className="thumb" src={productPhoto != null ? productPhoto : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Uo5uXtLNFsZFnlojvsKu_lYbG0S3r_m3RkFMX7JpJA&s"} alt="Product Thumbnail" />
                                      </td>
                                      <td>
                                        {productName}
                                      </td>
                                      <td>
                                        {productPrice}$
                                      </td>
                                      <td>
                                        <Button onClick={() => handleDelete(documentID)}>
                                          DELETE
                                        </Button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>
                          {isLastPage ? null :  <LoadMore {...configLoadMore}/>}

                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {showAlert && <Alert message="Product deleted successfully!" />}
                  </div>
                </div>
              </div>
            </>
          );
       
    
}

export default Admin;
