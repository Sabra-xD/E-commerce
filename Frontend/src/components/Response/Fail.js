
import './styles.scss'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Fail = () => {
    return(
        <div className='customWrapper'>
        <div className="success-container">
        <h3>Your order was cancelled</h3>
         <div className="x-mark-container">
        <FontAwesomeIcon icon={faTimesCircle} className="x-mark-icon" />
        </div>
        </div>
        </div>

    )
}

export default Fail;