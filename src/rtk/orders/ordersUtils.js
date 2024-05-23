

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

    console.log("The order is: ",order);

    try{
        
      await addOrder(order).then((orderID)=>{
            
            console.log("Order was added successfully");
            console.log("The orderID: ",orderID);

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
    console.log("The user we are updating: ", user);
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Before the getDocs");
            console.log("The user uid: ",user.uid);
            const q = query(collection(firestore, "users"), where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
            console.log("After the getDocs");
            if (querySnapshot.empty) {
                throw new Error("No document found for the user");
            }

            // Assume the uid is unique, so there should be only one document
            const userDoc = querySnapshot.docs[0];
            console.log("The userDOC.id: ",userDoc.id);
            const userRef = doc(firestore, "users", userDoc.id);
            console.log("The user ref is: ", userRef);

            await updateDoc(userRef, {
                orderHistory: arrayUnion({orderID,totalNum,totalPrice}),
            });
            console.log("Order history updated successfully");
            resolve();
        } catch (error) {
            console.log("Error in updating order history: ", error);
            reject(error);
        }
    });
}
  
export const fetchOrderWithID = (orderID) => {
    return new Promise ( async(resolve,reject) => {
        console.log("The orderID we got: ",orderID);
        try {
            const orderRef = doc(firestore,"orders",orderID);
            const orderDoc = await getDoc(orderRef);
            if(!orderDoc.exists()){
                throw new Error("No document was found");
            }
            const orderData = orderDoc.data();
            console.log("Order Data: ",orderData);
            resolve(orderData);
        } catch (error) {
            console.log("Error fetching order with id ", error);
            reject(error);
        }
    });
}