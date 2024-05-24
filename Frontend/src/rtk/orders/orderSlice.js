import { createSlice } from "@reduxjs/toolkit";


 const orderSlice = createSlice({
    name:"orders",
    initialState:{
        orderHistory: []
    },

    reducers: {
        
        setOrderHistory: (state,action) => {
            //Once we load the user here, we should dispatch ere.
            console.log("We are setting the order history here: ",action.payload);
            state.orderHistory = action.payload;
            saveOrderHistory(action.payload);
        },

        updateOrderHistory: (state,action) => {
            state.orderHistory.push(action.payload);
            const plainObject = JSON.parse(JSON.stringify(state.orderHistory));
            console.log("The plain Object we're saving: ",plainObject);
            saveOrderHistory(plainObject);
        },

        saveOrder: (state,action) => {
            //This redux states.
        }
    }


});


export const  {setOrderHistory,saveOrder,updateOrderHistory} = orderSlice.actions;
export default orderSlice.reducer;


export const getOrderHistory = (state) => state.orders.orderHistory;

//Saving it
const saveOrderHistory = (orderHistory) => {
    console.log("The order we're saving", orderHistory);
    const orderHistoryJSON = JSON.stringify(orderHistory);
    localStorage.setItem("orderHistory", orderHistoryJSON);
};

//Reading it from local.
export const readOrderHistory = (dispatch) => {
    console.log("Inside the readOrderHistory");
    const orderHistoryJSON = localStorage.getItem("orderHistory");
    const orderHistory = JSON.parse(orderHistoryJSON);
    console.log("The orderHistory we got from localStorage: ",orderHistory);
    dispatch(setOrderHistory(orderHistory));
  };