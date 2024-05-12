import { configureStore} from "@reduxjs/toolkit";
import userReducer from './user/userSlice.js';
import productReducer from './products/productSlice.js'
import {thunk} from "redux-thunk"; // Import Redux Thunk middleware

export const store = configureStore ({
    reducer: {
        user: userReducer,
        product: productReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});
