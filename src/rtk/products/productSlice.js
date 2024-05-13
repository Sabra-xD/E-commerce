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
    console.log("Inside the fetch");
    console.log("The user is: ",user);
    try{

        if(user?.uid){
            console.log("Inside the IF");
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


export const addProductController = (product,user) => async(dispatch) => {
    try{
        await handleAddProduct(product).then(
            ()=>{
                console.log("Product was added to the firebase sucessfully");
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
            console.log("Reading the fetchController?");
            dispatch(fetchProductsController(user));
        }else{
            console.log("Status was False");
        }


        // if(user?.id){
        //     const status = await deleteProduct(productID);
        //     if(status){
        //         dispatch(fetchProductsController(user));
        //     }else{
        //         console.log("Status was False");
        //     }
        // }
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
  