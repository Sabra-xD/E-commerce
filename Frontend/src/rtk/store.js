import { configureStore} from "@reduxjs/toolkit";
import userReducer from './user/userSlice.js';
import productReducer from './products/productSlice.js'
import cartReducer from './cart/cartSlice.js';
import {thunk} from "redux-thunk"; // Import Redux Thunk middleware
import orderReducer from "./orders/orderSlice.js";

export const store = configureStore ({
    reducer: {
        user: userReducer,
        product: productReducer,
        cart: cartReducer,
        orders:orderReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});
