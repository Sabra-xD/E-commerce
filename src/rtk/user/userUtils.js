

export const updateUserDeliveryInfo = (deliveryInfo) => {
    //Push that shit to the user
    //Also reset the user here.
}


// export const updateUserOrderHistory = (orderID,totalNum,totalPrice ,user) => {
//     console.log("The user we are updating: ", user);
//     return new Promise(async (resolve, reject) => {
//         try {
//             console.log("Before the getDocs");
//             console.log("The user uid: ",user.uid);
//             const q = query(collection(firestore, "users"), where("uid", "==", user.uid));
//             const querySnapshot = await getDocs(q);
//             console.log("After the getDocs");
//             if (querySnapshot.empty) {
//                 throw new Error("No document found for the user");
//             }

//             // Assume the uid is unique, so there should be only one document
//             const userDoc = querySnapshot.docs[0];
//             console.log("The userDOC.id: ",userDoc.id);
//             const userRef = doc(firestore, "users", userDoc.id);
//             console.log("The user ref is: ", userRef);

//             await updateDoc(userRef, {
//                 orderHistory: arrayUnion({orderID,totalNum,totalPrice}),
//             });
//             console.log("Order history updated successfully");
//             resolve();
//         } catch (error) {
//             console.log("Error in updating order history: ", error);
//             reject(error);
//         }
//     });
// }
  