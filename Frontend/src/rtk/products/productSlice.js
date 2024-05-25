import { createSlice } from "@reduxjs/toolkit";
import { deleteProduct, handleAddProduct, handleFetchProductWithID, handleFetchProducts } from "../../firebase/utils";



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
       
        setProduct:(state,action)=>{
                state.product = action.payload;
        },

        getProducts: (state,action) => {
            state.products = action.payload['products'];
        }
    }

});


export const  {getProducts,setProduct} = productSlice.actions;
export default productSlice.reducer;

export const getAllProducts = (state) => state.product?.products;
export const getProduct = (state) => state.product?.product;



export const fetchProductWithID = (user,documentID) => async(dispatch) => {

    try{

        if(user?.uid){
            //The payload sohuld be the documentID
            const product = await handleFetchProductWithID(documentID);
            //Set the state with that product
            dispatch(setProduct(product));
        }

    }catch(error){
        console.log("Error in the fetchProductWithID: ",error);
    }


}




export const fetchProductsController = (user, payload) => async (dispatch) => {
    try {
 
      if (user?.uid) {
        handleFetchProducts(payload)
          .then(products => {
    

            dispatch(getProducts({products}));

            // Save products locally:
            dispatch(saveProducts({products}));
          })
          .catch(error => {
            console.log("Error in fetching products:", error);
            // Handle the error here if needed
          });
      }
    } catch (error) {
      console.log("Error in the fetchProductsController", error);
    }
  }
  


export const addProductController = (product,user) => async(dispatch) => {
    try{
        await handleAddProduct(product).then(
            ()=>{
                dispatch(fetchProductsController(user,{filterType:''}));
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
            dispatch(fetchProductsController(user,{filterType:''}));
        }

    }catch(error){  
        console.log("The delete product controller: ",error);
    }
}

const saveProducts = (products) => {
    const productsJSON = JSON.stringify(products);
    localStorage.setItem("products", productsJSON);
};



  export const readProducts = (dispatch) => {
    const productsJSON = localStorage.getItem("products");
    const products = JSON.parse(productsJSON);
    dispatch(getProducts(products));
  };
  