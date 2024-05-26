import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductWithID, getProduct, setProduct } from "../../rtk/products/productSlice";
import { selectCurrentUser } from "../../rtk/user/userSlice";
import { useParams } from "react-router-dom";

import './styles.scss';
import CartButton from "../CartButton/CartButton";
import { altImage } from "../../assets/altImage";


const ProductDetails = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const product = useSelector(getProduct);
    const {documentID} = useParams();
    
    const {productPrice, productName, productPhoto} = product;
    useEffect(()=>{
       if(user) dispatch(fetchProductWithID(user,documentID));

   
       return () => {
        dispatch(
          setProduct({})
        )
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user]);


    return(
        //Display the product here.
        <div className="wrapper">

            <div className="productDetails">
            <img alt={altImage} src={product.productPhoto}/>
            <div>
            <h4>{product.productName}</h4>
            <h5>{product.productPrice}$</h5>
            </div>
            <CartButton product={{productName,
                                 productPhoto,
                               productPrice,
                               documentID}
                                          }/>
                                          
         { product?.productDescription ? (<span 
            dangerouslySetInnerHTML={{__html:product.productDescription}}
            />) : null
          }
        </div>
        </div>
       
    )
}


export default ProductDetails;