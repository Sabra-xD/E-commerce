import './styles.scss'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sucess = () => {
return(
    <div className='customWrapper'>
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