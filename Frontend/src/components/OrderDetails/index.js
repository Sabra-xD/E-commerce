
import { useParams } from 'react-router-dom';
import './styles.scss'
import { useEffect, useState } from 'react';
import { fetchOrderWithID } from '../../rtk/orders/ordersUtils';
const OrderDetails = () => {
    const {orderID} = useParams();
    const [order,setOrder] = useState({});
    const fetchOrder = async()=>{
        await fetchOrderWithID(orderID).then(
            (order)=>{
                setOrder(order);
            }
        ).catch(error=>{
            console.log("Error when fetching the order with ID: ",error)
        })
    }

    useEffect(()=>{
        fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        order && Object.keys(order).length ? (
            <div className='table-wrapper'>
                <h4>Previous Orders</h4>
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product, index) => (
                    <tr key={index}>
                      <td><img src={product.productPhoto} alt="Product Thumbnail"/></td>
                      <td>{product.productName}</td>
                      <td>{product.productPrice}$</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='container'>
                <h2>Loading...</h2>
            </div>
          )
    );
}

export default OrderDetails