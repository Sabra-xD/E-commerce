import {useState } from 'react';
import './styles.scss';
import { addProductController} from '../../../rtk/products/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../rtk/user/userSlice';
import FormInput from '../../Form/FormInput';
import FormSelect from '../../Form/FormSelect';

const AddProduct = () => {

    const [showForm, setShowForm] = useState(false);
    const user = useSelector(selectCurrentUser);


    const dispatch = useDispatch()

    const handleButtonClick = () => {

      //Open the form
      setShowForm(true);


    };
  
    const handleCancelClick = () => {

      setShowForm(false);
      
    };

    const [product, setProduct] = useState({
      productName: '',
      productPhoto:'',
      productPrice:'',
    });
  

    const handleChange = (e) => {
      const { name, value } = e.target;
      setProduct(prevProduct => ({
        ...prevProduct,
        [name]: value
      }));
    };
    
    const isProductEmpty = () => {
      return Object.values(product).some(value => value === '');
    };

    const handleOKClick = () => {
      // Handle form submission
      if(!isProductEmpty()){
        console.log("The product is: ",product);
        
        dispatch(addProductController(product,user));
        setShowForm(false);
      }else{
        console.log("The product is empty: ",product);
        //We need to throw an error here.
      }
    };




    return(
        <>
      <button className="button-styling" onClick={handleButtonClick}>Add New product</button>
      {showForm && (
        <div className="form-overlay">
          <div className="form">
            <h2>Add a New Product</h2>

            <FormSelect
              label="Category"
              options={[{
                value: "mens",
                name: "Mens"
              }, {
                value: "womens",
                name: "Womens"
              }]}
              // handleChange={e => setProductCategory(e.target.value)}
            />

            <label>Product Name</label>
            <FormInput placeholder='Enter product name' onChange={handleChange} name='productName'/>
            <label>Price</label>
            <FormInput type="number" placeholder='Price' name='productPrice' onChange={handleChange}/>
            <label>Photo URL</label>
            <FormInput placeholder='Photo URL' name="productPhoto" onChange={handleChange}/>

            

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