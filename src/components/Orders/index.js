
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import { useEffect } from 'react';
import { getOrderHistory, readOrderHistory } from '../../rtk/orders/orderSlice';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Orders = () => {
const dispatch = useDispatch();
const orderHistory = useSelector(getOrderHistory);
const navigator = useNavigate();


useEffect(() => {
    dispatch(readOrderHistory);
},[dispatch]);

    return(
        orderHistory  ? (
            <div className='table-wrapper'>
                <h4>Previous Orders</h4>
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Date of Purchase</th>
                    <th>Order ID</th>
                    <th>Number of Items</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory?.map((details, index) => (
                    <tr key={index}>
                      <td>{moment(details.createdAt).format("DD/MM/YY")}</td>
                      <td onClick={()=>{
                        navigator(`/orderDetails/${details.orderID}`);
                      }}>{details.orderID}</td>
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



