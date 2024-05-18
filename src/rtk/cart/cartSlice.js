import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name:"cart",
    initialState : {
        cartItems: [],
        totalNumCartItems: 0,
        totalPrice: 0,
    },
    reducers: {

        fetchCartItems: (state,action) => {
            if(action.payload){
                //Here we set it from the readCartList function:
                const List = action.payload;
                console.log("The List we're setting: ",List);
                state.cartItems = List;
            }
        },
        addCartItem: (state, action) => {
            if (action.payload) {
                const newCartItem = action.payload;
                state.cartItems.push(newCartItem);
                state.totalNumCartItems = state.cartItems.length;
                const plainObject = JSON.parse(JSON.stringify(state.cartItems));
                saveCart(plainObject);  // Save the updated cartItems array

                // Convert state to a plain object for logging
                console.log("New cart Items: ",plainObject);
                console.log("Total Number of Cart Items: ", state.totalNumCartItems);
                
            }
        }
        ,
        removeCartItem: (state, action) => {
            console.log("The action payload we're removing: ", action.payload);
            // Filter out the item to remove
            state.cartItems = state.cartItems.filter(item => item.documentID !== action.payload.documentID);
            console.log("The Old Number is: ",state.totalNumCartItems)

            state.totalNumCartItems = state.cartItems.length;
            console.log("The New Number is: ",state.totalNumCartItems)
            const plainObject = JSON.parse(JSON.stringify(state.cartItems));
                saveCart(plainObject);  // Save the updated cartItems array

        }
    }
});


export const {addCartItem,removeCartItem,fetchCartItems} = cartSlice.actions;
export default cartSlice.reducer;

export const getCartList = (state) => state.cart?.cartItems;



export const checkIfExist = (product,cartList) => {
//Check if the product exists within the given list.
console.log("The cartList we're finding on: ",cartList);
let foundObject = cartList.find(obj => obj.documentID === product.documentID);
console.log("Found Object in exists: ",foundObject);
if(foundObject){
    return true
}else{
    return false;
}
}

export const addToCartController = (product,cartList) => (dispatch)=>{

    console.log("The product in question: ",product);
    console.log("The cart list inside the controller: ",cartList);
    const exists = checkIfExist(product,cartList);
    if(exists){
        //remove it from the list
        console.log("Removing the product");
        dispatch(removeCartItem(product));
    }else{
        //Add it to the cart.
        dispatch(addCartItem(product))
    }

}




const saveCart = (cartList=[]) => {
    console.log("The cartList we're saving", cartList);
    const cartLIstJSON = JSON.stringify(cartList);
    localStorage.setItem("cartList", cartLIstJSON);
};




export const readCartList = (dispatch) => {
    const cartLIstJSON = localStorage.getItem("cartList");
    const cartList = JSON.parse(cartLIstJSON);
    console.log("The cartList we got from the local storage: ",cartList);

    dispatch(fetchCartItems(cartList));
  };
  





