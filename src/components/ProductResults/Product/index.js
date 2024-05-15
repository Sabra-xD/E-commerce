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
            <p>{productName}</p>
            <p>{productPrice}$</p>
            <Button style={{"marginTop":"5px"}}>Add to Cart</Button>
        </div>
    
    )
}


export default Product;