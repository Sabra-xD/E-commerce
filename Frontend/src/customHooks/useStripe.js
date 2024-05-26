import { clearCart } from "../rtk/cart/cartSlice";
import { saveOrder } from "../rtk/orders/ordersUtils";

const baseURL = 'https://e-commerce-1-7ti8.onrender.com';

export const fetchData = async (products) => {
    try {
      const response = await fetch(`${baseURL}/create-checkout-session`, {
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


  export const fetchSuccess = (sessionID, products, totalPrice, user) => async (dispatch) => {
    
    try {
      const response = await fetch(`${baseURL}/success/${sessionID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: products,
        }),
      });
  

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      await dispatch(saveOrder(products, totalPrice, user));
      dispatch(clearCart());
  
    } catch (error) {
      console.log("Error when fetching success data: ", error);
    }
  };
  