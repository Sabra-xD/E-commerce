import { createSlice } from "@reduxjs/toolkit";
import { deleteProduct, handleAddProduct, handleFetchProducts } from "../../firebase/utils";



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
            saveProducts(state.products);
        },
        getProducts: (state,action) => {
            state.products = action.payload;
        }
    }

});


export const  {addProduct,getProducts} = productSlice.actions;
export default productSlice.reducer;

export const getAllProducts = (state) => state.product?.products;



export const fetchProductsController = (user,filterType) => async(dispatch) => {
    try{
        console.log("The filter type is: ",filterType);
        if(user?.uid){
            await handleFetchProducts(filterType).then(
                (products) =>{
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


export const addProductController = (product,user) => async(dispatch) => {
    try{
        await handleAddProduct(product).then(
            ()=>{
                //Adding the product to the state
                dispatch(addProduct(product));
                
                //Refetching the products.
                dispatch(fetchProductsController(user));
            }
        ).catch(err=>{
            console.log("The error in handleAddProduct: ",err);
        })
    }catch(error){
        console.log("Error in the addProductController: ",error);
    }

}


export const deleteProductController = (user,productID) => async(dispatch) => {
    try{

        const status = await deleteProduct(productID);
        if(status){
            dispatch(fetchProductsController(user));
        }else{
            console.log("Status was False");
        }

    }catch(error){  
        console.log("The delete product controller: ",error);
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
  