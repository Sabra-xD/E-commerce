import './styles.scss'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSuccess } from '../../customHooks/useStripe';
import { useDispatch, useSelector } from 'react-redux';
import { getCartList, getTotalPrice } from '../../rtk/cart/cartSlice';
import { selectCurrentUser } from '../../rtk/user/userSlice';
import LoadingSpinner from '../LoadingSpinner';

const Sucess = () => {
  const {sessionID} = useParams();
  const products = useSelector(getCartList);
  const totalPrice = useSelector(getTotalPrice);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [loading,isLoading] = useState(false);
  const sucessFunction = async() => {
    console.log("The products we are supposed to be sending: ",products);
    await dispatch(fetchSuccess(sessionID,products,totalPrice,user));
    isLoading(false);
  }

  useEffect(() => {
    isLoading(true);
    sucessFunction();
    isLoading(false);
  }, []); 
return(

  loading ? <LoadingSpinner /> :     <div className='customWrapper'>
  <div className="success-container">
<h3>Your purchase was successful!</h3>
<div className="check-mark-container">
<FontAwesomeIcon icon={faCheckCircle} className="check-mark-icon" />
</div>
</div>
</div>
 
  
);
}

export default Sucess;