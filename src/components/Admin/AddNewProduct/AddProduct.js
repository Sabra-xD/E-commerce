import { useState } from 'react';
import './styles.scss';

const AddProduct = () => {

    const [showForm, setShowForm] = useState(false);

    const handleButtonClick = () => {
      setShowForm(true);
    };
  
    const handleCancelClick = () => {
      setShowForm(false);
    };
  
    const handleOKClick = () => {
      // Handle form submission
      setShowForm(false);
    };

    return(
        <>
              

      <button className="button-styling" onClick={handleButtonClick}>Add New product</button>
      {showForm && (
        <div className="form-overlay">
          <div className="form">
            <h2>Add a New Product</h2>

            <select>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <label>Product Name</label>
            <input placeholder='Enter product name'/>
            <input placeholder='amount'/>
            <input placeholder='Enter product name'/>
            <input type="number" placeholder='Price'/>

            

            <div className="button-container">
              <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
              <button className="ok-button" onClick={handleOKClick}>OK</button>
            </div>
          </div>
        </div>
      )}
       </>
    );
}

export default AddProduct;