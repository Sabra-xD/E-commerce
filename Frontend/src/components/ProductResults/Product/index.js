import { useNavigate } from "react-router-dom";
import CartButton from "../../CartButton/CartButton";

const Product = ({
    productName,
    productPhoto,
    productPrice,
    //Use this when deleting the product.
    documentID,
}) => {

    const navigator = useNavigate();
    const product = {
        productName,
         productPhoto,
    productPrice,
    documentID
    }


    return(
        <div className="ProductCard" onClick={()=>{
            //Navigate to the product-details page
            navigator(`/product-details/${documentID}`);
        }}>
            <img src={productPhoto} alt="productPhoto" />
            <p>{productName}</p>
            <p>{productPrice}$</p>
            
            <CartButton product={product}/>
        </div>
    
    )
}


export default Product;