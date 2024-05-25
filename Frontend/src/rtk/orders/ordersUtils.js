

//Uploading the order to orders in firebase.

import { addDoc, arrayUnion, collection, doc, updateDoc,query,getDocs, where, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/utils";
import { updateOrderHistory } from "./orderSlice";





//Uploads the order to our firebase.
export const saveOrder = (cartItems,totalPrice,user) => async(dispatch) => {
    const createdAt = Date.now();
    //We need to add the userID to the order so we know who it belongs to.

    const order = {
        products: cartItems,
        totalNum: cartItems.length,
        totalPrice: totalPrice,
        uid: user?.uid,
        createdAt: createdAt,
    }


    try{
        
      await addOrder(order).then((orderID)=>{
            dispatch(updateOrderHistory({orderID:orderID,totalNum: cartItems.length,totalPrice: totalPrice}));
            updateUserOrderHistory(orderID,cartItems.length,totalPrice,user);

           
        }
        ).catch(
            (error)=>{
                console.log("Error when trying to addOrder: ",error);
            }
        )

    }catch(error){
        console.log("Error in the save order: ",error)
    }

}


export const addOrder =  (order) =>{
    return new Promise( async(resolve,reject)=>{
    await addDoc(collection(firestore,"orders"),order).then((res)=>{
        resolve(res.id);
      }).catch(
        err => {
          reject(err);
        }
      )
    })
  }

  export const updateUserOrderHistory = (orderID,totalNum,totalPrice ,user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const q = query(collection(firestore, "users"), where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                throw new Error("No document found for the user");
            }
            const userDoc = querySnapshot.docs[0];
            const userRef = doc(firestore, "users", userDoc.id);

            await updateDoc(userRef, {
                orderHistory: arrayUnion({orderID,totalNum,totalPrice}),
            });
            resolve();
        } catch (error) {
            console.log("Error in updating order history: ", error);
            reject(error);
        }
    });
}
  
export const fetchOrderWithID = (orderID) => {
    return new Promise ( async(resolve,reject) => {
        try {
            const orderRef = doc(firestore,"orders",orderID);
            const orderDoc = await getDoc(orderRef);
            if(!orderDoc.exists()){
                throw new Error("No document was found");
            }
            const orderData = orderDoc.data();
            resolve(orderData);
        } catch (error) {
            console.log("Error fetching order with id ", error);
            reject(error);
        }
    });
}