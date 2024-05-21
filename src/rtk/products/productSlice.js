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
            //Setting the product data when fetching it by ID.
            console.log("The action.payload is: ",action.payload);
                state.product = action.payload;
        },

        addProduct:(state,action) => {
            //Adding a product to the list.
            // console.log("The state products: ",state.products,"The state product we are pushing: ",action.payload);
            // state.products.push(action.payload);
            // saveProducts(state.products);
        },
        getProducts: (state,action) => {
            state.products = action.payload['products'];
            // console.log("The action.payload is: ",action.payload, "The product is: ",action.payload['products']);
        }
    }

});


export const  {addProduct,getProducts,setProduct} = productSlice.actions;
export default productSlice.reducer;

export const getAllProducts = (state) => state.product?.products;
export const getProduct = (state) => state.product?.product;



export const fetchProductWithID = (user,documentID) => async(dispatch) => {

    try{

        if(user?.uid){
            console.log("Inside the if condition")
            //The payload sohuld be the documentID
            const product = await handleFetchProductWithID(documentID);
            console.log("The returned product: ",product);
            //Set the state with that product
            dispatch(setProduct(product));
        }

    }catch(error){
        console.log("Error in the fetchProductWithID: ",error);
    }


}




export const fetchProductsController = (user, payload) => async (dispatch) => {
    try {
      console.log("The payload is: ", payload);
      console.log("The user is: ", user);
      if (user?.uid) {
        console.log("Inside the if condition");
        handleFetchProducts(payload)
          .then(products => {
            console.log("The products we got back inside the fetch: ", products);
            // const { data } = products;
            // console.log("The data we got back inside the fetchProductController: ", data)

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
                //Adding the product to the state
                dispatch(addProduct(product));
                
                //Refetching the products.
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
  