import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import { checkIfExist,getCartCount, getCartList, getTotalPrice, removeCartItem } from '../../rtk/cart/cartSlice';
import Button from '../Form/Button';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../rtk/user/userSlice';
import { fetchData } from '../../customHooks/useStripe';
import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';

const CheckOut = () => {
    const products = useSelector(getCartList);
    const cartListCount = useSelector(getCartCount);
    const totalPrice = useSelector(getTotalPrice);
    const user = useSelector(selectCurrentUser);
    console.log("The user after the selector: ",user);
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const [loading,isLoading] = useState(false);



    const handleActionButton = (product) => {
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
      
      loading ? (<LoadingSpinner/>) : (
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
           {user?.deliveryInfo ? (

            <div>
              <p>Delivery Information: </p>
              <p>Recepient Name: {user.deliveryInfo.fullName}</p>
              <p>Phone Number: {user.deliveryInfo.phoneNumber}</p>
              <p>Address: {user.deliveryInfo.postalCode}, {user.deliveryInfo.address}, {user.deliveryInfo.city}</p>
              <p>State/Governate: {user.deliveryInfo.state}, {user.deliveryInfo.country}</p>
            </div>

           ) : null}
            <div className="button-container">
            <Button onClick={()=>{
                navigator('/search');
            }}>Continue Shopping</Button>
            <Button onClick={async()=>{
                if(Object.keys(user?.deliveryInfo).length>0){
                  console.log("Pressing the button");
                  console.log("The products we got from the getCartList: ",products);
                  isLoading(true);
                  await fetchData(products);
                }else{
                  //Route us to the billing information page.
                  navigator('/delivery-information',{state: {noAddress: true, products:products}});
                }
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

    )
}  


export default CheckOut;