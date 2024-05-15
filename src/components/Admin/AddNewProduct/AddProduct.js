import { useEffect, useState } from 'react';
import './styles.scss';
import { addProductController } from '../../../rtk/products/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../rtk/user/userSlice';
import FormInput from '../../Form/FormInput';
import FormSelect from '../../Form/FormSelect';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddProduct = () => {
  const [showForm, setShowForm] = useState(false);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const [productCategory, setProductCategory] = useState('mens');

  const [product, setProduct] = useState({
    productName: '',
    productPhoto: '',
    productPrice: '',
    productCategory: 'mens',
    productDescription: '',
  });

  const handleButtonClick = () => {
    setShowForm(true); // Open the form
  };

  const handleCancelClick = () => {
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleOKClick = () => {
    // Handle form submission
    if (!isProductEmpty()) {
      dispatch(addProductController(product, user));
      setProductCategory('mens'); // Reset category to default
      setShowForm(false);
    } else {
      console.log("The product is empty: ", product);
      // Throw an error or handle empty product case
    }
  };

  const isProductEmpty = () => {
    return Object.values(product).some(value => value === '');
  };

  useEffect(() => {
    setProduct(prevProduct => ({
      ...prevProduct,
      productCategory: productCategory
    }));
  }, [productCategory]);

  return (
    <>
      <button className="button-styling" onClick={handleButtonClick}>Add New product</button>
      {showForm && (
        <div className="form-overlay">
          <div className="form">
            <h2>Add a New Product</h2>
            <FormSelect
              label="Category"
              options={[
                { value: "mens", name: "Mens" },
                { value: "womens", name: "Womens" }
              ]}
              handleChange={e => setProductCategory(e.target.value)}
            />
            <label>Product Name</label>
            <FormInput placeholder='Enter product name' onChange={handleChange} name='productName' />
            <label>Price</label>
            <FormInput type="number" placeholder='Price' name='productPrice' onChange={handleChange} />
            <label>Photo URL</label>
            <FormInput placeholder='Photo URL' name="productPhoto" onChange={handleChange} />
            <label>Description</label>
            <CKEditor
              editor={ClassicEditor} // Use ClassicEditor build
              data={product.productDescription} // Set initial data for CKEditor
              onChange={(event, editor) => {
                const data = editor.getData();
                setProduct(prevProduct => ({
                  ...prevProduct,
                  productDescription: data
                }));
              }}
            />
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
