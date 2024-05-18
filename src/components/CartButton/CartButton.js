import { useDispatch, useSelector } from "react-redux";
import { addCartItem, checkIfExist, removeCartItem } from "../../rtk/cart/cartSlice";
import Button from "../Form/Button";
import { useEffect, useState } from "react";


const CartButton = ({ product }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems);

    const [exists,setExists] = useState(false);

    const handleCartAction = () => {
        if (exists) {
            dispatch(removeCartItem(product,cartItems));
        } else {
            dispatch(addCartItem(product));
        }
    };



    useEffect(()=>{
        console.log("The cartItems: ",cartItems);
       if(checkIfExist(product,cartItems)){

        setExists(true)

       }else{
        setExists(false);
       }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cartItems])

    return (
        <Button style={{ marginTop: '5px' }} onClick={handleCartAction}>
            {exists ? 'Remove from Cart' : 'Add to Cart'}
        </Button>
    );
};



export default CartButton;
