import { createSlice } from "@reduxjs/toolkit";
import { handleFetchProducts } from "../../firebase/utils";



export const productSlice = createSlice({
    name:"products",
    initialState: {
        newProduct: null,
        products: [],
        product: {},
        queryDoc: null,
        isLastPage: false,
    },
    reducers: {
        addProduct:(state,action) => {
            //Adding a product to the list.
            state.products.push(action.payload);
        },
        getProducts: (state,action) => {
            console.log("The action payload is: ",action.payload);
            state.products = action.payload;

            console.log("The state now is: ",state.products);
        }
    }

});


export const  {addProduct,getProducts} = productSlice.actions;
export default productSlice.reducer;

export const getAllProducts = (state) => state.product?.products;



export const fetchProductsController = (user) => async(dispatch) => {
    try{

        if(user?.id){
            await handleFetchProducts().then(
                (products) =>{
                    console.log("The products are inside the fetch Controller: ",products);
                    dispatch(getProducts(products));
                    
                    //Save products locally:
                    dispatch(saveProducts(products));
                }
            ).catch((error)=>{
                console.log("Error in the products controller promise: ",error);
            });
        }
      
    }catch(error){
        console.log("Error in the fetchProductsController");
    }
}

const saveProducts = (products) => {
    console.log("The products we're saving", products);
    const productsJSON = JSON.stringify(products);
    localStorage.setItem("products", productsJSON);
};



  export const readProducts = (dispatch) => {
    const productsJSON = localStorage.getItem("products");
    const products = JSON.parse(productsJSON);
    dispatch(getProducts(products));
  };
  