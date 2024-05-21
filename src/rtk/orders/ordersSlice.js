import { createSlice } from "@reduxjs/toolkit";


export const ordersSlice = createSlice({
    name:"orders",
    
    initialState:{

    },

    reducers: {
        
        setOrderHistory: (state,action) => {
            //This should update the history received from the backend.
        },

        saveOrder: (state,action) => {
            //This redux states.
        }
    }


})
