
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import { useEffect } from 'react';
import { getOrderHistory, readOrderHistory } from '../../rtk/orders/orderSlice';

const Orders = () => {
//The useSelector is RETURN FUCKING NULL FOR NO FUCKING REASON.
const dispatch = useDispatch();
const orderHistory = useSelector(getOrderHistory);


useEffect(() => {
    dispatch(readOrderHistory);
},[dispatch]);

console.log("The order history is: ",orderHistory);
    return(

        orderHistory  ? (
            <div className='table-wrapper'>
                <h4>Previous Orders</h4>
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Number of Items</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory?.map((details, index) => (
                    <tr key={index}>
                      <td>{details.orderID}</td>
                      <td>{details.totalNum}</td>
                      <td>{details.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='container'>
                <h4>There are no past orders</h4>
            </div>
          )
    )
}


export default Orders



