import { createSlice } from "@reduxjs/toolkit";

// Utility function to save cart to localStorage
const saveCart = (cartList = []) => {
  const cartListJSON = JSON.stringify(cartList);
  localStorage.setItem("cartList", cartListJSON);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalNumCartItems: 0,
    totalPrice: 0,
  },
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.totalNumCartItems = 0;
      state.totalPrice = 0;
      saveCart(state.cartItems);
    },

    fetchCartItems: (state, action) => {
      if (action.payload) {
        const List = action.payload;
        state.cartItems = List;
        state.totalNumCartItems = state.cartItems.length;
        state.totalPrice = List.reduce((sum, product) => sum + parseFloat(product.productPrice), 0);
      }
    },

    addCartItem: (state, action) => {
      if (action.payload) {
        const newCartItem = action.payload;
        state.cartItems.push(newCartItem);
        state.totalNumCartItems = state.cartItems.length;
        state.totalPrice += parseFloat(newCartItem.productPrice);
        saveCart(state.cartItems);
      }
    },

    removeCartItem: (state, action) => {
      const filteredCartItems = state.cartItems.filter(item => item.documentID !== action.payload.documentID);
      state.cartItems = filteredCartItems;
      state.totalNumCartItems = filteredCartItems.length;
      state.totalPrice -= parseFloat(action.payload.productPrice);
      if (state.totalPrice < 0) state.totalPrice = 0; // Ensure totalPrice doesn't go negative
      saveCart(filteredCartItems);
    },
  },
});

export const { addCartItem, removeCartItem, fetchCartItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const getCartList = (state) => state.cart?.cartItems;
export const getCartCount = (state) => state.cart?.totalNumCartItems;
export const getTotalPrice = (state) => state.cart?.totalPrice;

export const checkIfExist = (product, cartList) => {
  // Check if the product exists within the given list
  return cartList.some(obj => obj.documentID === product.documentID);
};

export const addToCartController = (product, cartList) => (dispatch) => {
  const exists = checkIfExist(product, cartList);
  if (exists) {
    // Remove it from the list
    dispatch(removeCartItem(product));
  } else {
    // Add it to the cart
    dispatch(addCartItem(product));
  }
};

export const readCartList = (dispatch) => {
  const cartListJSON = localStorage.getItem("cartList");
  if (cartListJSON) {
    const cartList = JSON.parse(cartListJSON);
    dispatch(fetchCartItems(cartList));
  }
};
