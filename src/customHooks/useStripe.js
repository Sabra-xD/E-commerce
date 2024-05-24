import { clearCart } from "../rtk/cart/cartSlice";
import { saveOrder } from "../rtk/orders/orderSlice";

export const fetchData = async (products) => {
  console.log("The products inside fetchData: ",products);
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



export const fetchSuccess = (sessionID, products,totalPrice,user) => async (dispatch)=>{
  console.log("The products we are sending: ",products);
    try {
      const response = await fetch(`http://localhost:5000/success/${sessionID}`, {
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
          dispatch(saveOrder(products,totalPrice,user));
          //Clear the cart
          dispatch(clearCart());
          //We need to re-fetch the products to update the ones we've right now.
          
    } catch (error) {
      console.log("Error when fetching success data: ", error);
    }

};
  