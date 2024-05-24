
import { collection, doc, updateDoc,query,getDocs, where } from "firebase/firestore";
import { fetchUserInfo, firestore } from "../../firebase/utils";
import { setUser } from "./userSlice";

export const updateUserDeliveryInfo = (deliveryInfo,user) => (dispatch)=>{

    return new Promise(async(resolve,reject)=>{
        try{
            const q = query(collection(firestore, "users"), where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.empty){
                throw new Error("No document found for the user");
            }
            const userDoc = querySnapshot.docs[0];
            const userRef = doc(firestore, "users", userDoc.id);
            await updateDoc(userRef, {
                deliveryInfo: deliveryInfo,
            }).then(async ()=>{
                try{
                    const response =  await fetchUserInfo(user);
                    dispatch(setUser({user:response}));
                }catch(error){
                    console.log("Error when trying to fetch User Info: ",error);
                }
           
            });
            resolve();
        }catch(error){
            reject(error);
        }
    })
}

