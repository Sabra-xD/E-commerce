import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import { checkIfExist,getCartCount, getCartList, getTotalPrice, removeCartItem } from '../../rtk/cart/cartSlice';
import Button from '../Form/Button';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
    const products = useSelector(getCartList);
    const cartListCount = useSelector(getCartCount);
    const totalPrice = useSelector(getTotalPrice);
    const navigator = useNavigate();
    const dispatch = useDispatch();

    const fetchData = async (products) => {
        try {
          const response = await fetch("http://localhost:5000/create-checkout-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: products,
            }),
          });
  
          if (!response.ok) {
            console.log("Error was thrown");
            throw new Error(await response.text());
          }
          const data = await response.json();
          window.location.href = data.url;
        } catch (error) {
            console.log("The error in the fetch function is: ",error);
        }
      };
    

    const handleActionButton = (product) => {
        console.log("The product we are deleting is: ",product);
        if(checkIfExist(product,products)){
            dispatch(removeCartItem({
                productName:product.productName,
                  productPhoto: product.product,
                 productPrice: product.productPrice,
                 documentID: product.documentID,
            }));
        }
    }

    return(
        <div className='table-wrapper'>

        {cartListCount > 0 ? (<>
            <table className="product-table">
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product, index) => (
                    <tr key={index}>
                    <td><img src={product.productPhoto} alt={product.name} onClick={()=>{
                                    navigator(`/product-details/${product.documentID}`);
                    }}/></td>
                    <td>{product.productName}</td>
                    <td>{product.productPrice}$</td>
                    <td><button className='removeButton' onClick = {()=>{
                        handleActionButton(product);
                    }}>Remove</button></td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
           <tr>
          <td colSpan="4" style={{ border: 'none' }}> 
           
           <p>Your Total is: {totalPrice}</p>
            <div className="button-container">
            <Button onClick={()=>{
                navigator('/search');
            }}>Continue Shopping</Button>
            <Button onClick={()=>{
                console.log("The products we're buying: ",products);
                fetchData(products);
            }}>Check Out</Button>

            </div>
          </td>
        </tr>
      </tfoot>
         
        </table></>) : (<>
        <div className='emptyCart'>
        <h1>Your cart is empty</h1>
        </div>
        </>)}

  

        </div>

    )
}  


export default CheckOut;