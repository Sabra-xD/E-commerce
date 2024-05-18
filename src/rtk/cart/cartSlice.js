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
                state.cartItems = List;
                state.totalNumCartItems = state.cartItems.length;
            }
        },
        addCartItem: (state, action) => {
            if (action.payload) {
                const newCartItem = action.payload;
                state.cartItems.push(newCartItem);
                state.totalNumCartItems = state.cartItems.length;
                const plainObject = JSON.parse(JSON.stringify(state.cartItems));
                state.totalPrice = parseFloat(state.totalPrice) + parseFloat(newCartItem.productPrice);
                saveCart(plainObject);  

            
                
            }
        }
        ,
        removeCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.documentID !== action.payload.documentID);
            state.totalNumCartItems = state.cartItems.length;
            const plainObject = JSON.parse(JSON.stringify(state.cartItems));
            saveCart(plainObject);  
            state.totalPrice = parseFloat(state.totalPrice) - parseFloat(action.payload.productPrice);
        }
    }
});


export const {addCartItem,removeCartItem,fetchCartItems} = cartSlice.actions;
export default cartSlice.reducer;

export const getCartList = (state) => state.cart?.cartItems;
export const getCartCount = (state) => state.cart?.totalNumCartItems;
export const getTotalPrice = (state)=> state.cart?.totalPrice;



export const checkIfExist = (product,cartList) => {
//Check if the product exists within the given list.
let foundObject = cartList.find(obj => obj.documentID === product.documentID);
if(foundObject){
    return true
}else{
    return false;
}
}

export const addToCartController = (product,cartList) => (dispatch)=>{

    const exists = checkIfExist(product,cartList);
    if(exists){
        //remove it from the list
        dispatch(removeCartItem(product));
    }else{
        //Add it to the cart.
        dispatch(addCartItem(product))
    }

}




const saveCart = (cartList=[]) => {
    const cartLIstJSON = JSON.stringify(cartList);
    localStorage.setItem("cartList", cartLIstJSON);
};




export const readCartList = (dispatch) => {
    const cartLIstJSON = localStorage.getItem("cartList");
    const cartList = JSON.parse(cartLIstJSON);
    dispatch(fetchCartItems(cartList));
  };
  





