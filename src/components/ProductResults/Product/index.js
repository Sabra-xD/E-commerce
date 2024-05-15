import { useNavigate } from "react-router-dom";
import Button from "../../Form/Button";
import '../styles.scss'

const Product = ({
    productName,
    productPhoto,
    productPrice,
    //Use this when deleting the product.
    documentID,
}) => {

    const navigator = useNavigate();
    return(
        <div className="ProductCard" onClick={()=>{
            //Navigate to the product-details page
            navigator(`/product-details/${documentID}`);
        }}>
            <img src={productPhoto} alt="productPhoto" />
            <p>{productName}</p>
            <p>{productPrice}$</p>
            <Button style={{"marginTop":"5px"}}>Add to Cart</Button>
        </div>
    
    )
}


export default Product;