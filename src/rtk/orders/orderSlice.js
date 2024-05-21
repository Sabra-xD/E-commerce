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
        },

        updateOrderHistory: (state,action) => {
            state.orderHistory.push(action.payload);
        },

        saveOrder: (state,action) => {
            //This redux states.
        }
    }


});


export const  {setOrderHistory,saveOrder,updateOrderHistory} = orderSlice.actions;
export default orderSlice.reducer;


export const getOrderHistory = (state) => state.orders.orderHistory;

