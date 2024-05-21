
import { useSelector } from 'react-redux';
import './styles.scss';
import { getOrderHistory } from '../../rtk/orders/orderSlice';
import { useEffect } from 'react';
import { selectCurrentUser } from '../../rtk/user/userSlice';

const Orders = () => {
//The useSelector is RETURN FUCKING NULL FOR NO FUCKING REASON.

const user = useSelector(selectCurrentUser);
console.log("The user before oder history:  ",user);
const orderHistory = user?.orderHistory;

console.log("The order history we've is: ",orderHistory)

useEffect(()=>{
    
},);

console.log("The order history is: ",orderHistory);
    return(
        //We need to map the order IDs here inside a table.
        <div className='table-wrapper'>
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
    )
}


export default Orders