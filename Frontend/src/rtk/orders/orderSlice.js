import { createSlice } from "@reduxjs/toolkit";


 const orderSlice = createSlice({
    name:"orders",
    initialState:{
        orderHistory: []
    },

    reducers: {
        
        setOrderHistory: (state,action) => {
            state.orderHistory = action.payload;
            saveOrderHistory(action.payload);
        },

        updateOrderHistory: (state,action) => {
         
            state.orderHistory.push(action.payload);
            const plainObject = JSON.parse(JSON.stringify(state.orderHistory));
            saveOrderHistory(plainObject);
        },

     
    }


});


export const  {setOrderHistory,updateOrderHistory} = orderSlice.actions;
export default orderSlice.reducer;


export const getOrderHistory = (state) => state.orders.orderHistory;

//Saving it
const saveOrderHistory = (orderHistory) => {
    const orderHistoryJSON = JSON.stringify(orderHistory);
    localStorage.setItem("orderHistory", orderHistoryJSON);
};

//Reading it from local.
export const readOrderHistory = (dispatch) => {
    const orderHistoryJSON = localStorage.getItem("orderHistory");
    const orderHistory = JSON.parse(orderHistoryJSON);
    dispatch(setOrderHistory(orderHistory));
  };