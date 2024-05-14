import Button from "../../Form/Button";
import '../styles.scss'

const Product = ({
    productName,
    productPhoto,
    productPrice,
    //Use this when deleting the product.
    documentID,
}) => {


    return(
        <div className="ProductCard">
            <img src={productPhoto} alt="productPhoto" />
            <h4>{productName}</h4>
            <h5>{productPrice}$</h5>
            <Button style={{"marginTop":"5px"}}>Add to Cart</Button>
        </div>
    
    )
}


export default Product;