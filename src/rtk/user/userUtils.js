import { collection, doc, updateDoc, query, getDocs, where } from "firebase/firestore";
import { fetchUserInfo, firestore } from "../../firebase/utils";
import { setUser } from "./userSlice";

export const updateUserDeliveryInfo = (deliveryInfo, user) => async (dispatch) => {
    try {
        const q = query(collection(firestore, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            throw new Error("No document found for the user");
        }
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(firestore, "users", userDoc.id);
        await updateDoc(userRef, {
            deliveryInfo: deliveryInfo,
        });
        
        const response = await fetchUserInfo(user);
        dispatch(setUser({ user: response }));
    } catch (error) {
        throw new Error("Error updating delivery info: " + error.message);
    }
};
