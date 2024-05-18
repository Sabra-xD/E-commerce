import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductWithID, getProduct, setProduct } from "../../rtk/products/productSlice";
import { selectCurrentUser } from "../../rtk/user/userSlice";
import { useParams } from "react-router-dom";

import './styles.scss';
import CartButton from "../CartButton/CartButton";

//Don't forget to cleam that product passing bit in Cart Button.

const ProductDetails = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const product = useSelector(getProduct);
    const {documentID} = useParams();
    
    const { productDescription,productPrice, productName, productPhoto} = product;
    console.log("The documentID we got from the params is: ",documentID);
    useEffect(()=>{
       if(user) dispatch(fetchProductWithID(user,documentID));

    // Reset the product.
       return () => {
        dispatch(
          setProduct({})
        )
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user]);

    console.log("The product we got from the useSelector: ",product);

    return(
        //Display the product here.
        <div className="wrapper">

            <div className="productDetails">
            <img alt="ProductThumbnail" src={productPhoto}/>
            <div>
            <h4>{productName}</h4>
            <h5>{productPrice}$</h5>
            </div>
            <CartButton product={{productName,
                                 productPhoto,
                               productPrice,
                               documentID}
                                          }/>
            <span 
            dangerouslySetInnerHTML={{__html:productDescription}}
            />
        </div>
        </div>
       
    )
}


export default ProductDetails;