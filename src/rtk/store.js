import { configureStore} from "@reduxjs/toolkit";
import userReducer from './user/userSlice.js';
import productReducer from './products/productSlice.js'
import cartReducer from './cart/cartSlice.js';
import {thunk} from "redux-thunk"; // Import Redux Thunk middleware

export const store = configureStore ({
    reducer: {
        user: userReducer,
        product: productReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});
