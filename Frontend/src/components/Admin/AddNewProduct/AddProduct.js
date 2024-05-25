import { useEffect, useState, useRef } from 'react';
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
  const formRef = useRef(null);

  const [productCategory, setProductCategory] = useState('mens');

  const initialProductState = {
    productName: '',
    productPhoto: '',
    productPrice: '',
    productCategory: 'mens',
    productDescription: '',
  };

  const [product, setProduct] = useState(initialProductState);

  const handleButtonClick = () => {
    setShowForm(true);
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
    if (!isProductEmpty()) {
      dispatch(addProductController(product, user));
      setProduct(initialProductState);
      setProductCategory('mens');
      setShowForm(false);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
        setProduct(initialProductState);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formRef]);

  return (
    <>
      <button className="button-styling" onClick={handleButtonClick}>Add New product</button>
      {showForm && (
        <div className="form-overlay">
          <div className="form" ref={formRef}>
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
            <FormInput placeholder='Enter product name' onChange={handleChange} name='productName' value={product.productName} />
            <label>Price</label>
            <FormInput type="number" placeholder='Price' name='productPrice' onChange={handleChange} value={product.productPrice} />
            <label>Photo URL</label>
            <FormInput placeholder='Photo URL' name="productPhoto" onChange={handleChange} value={product.productPhoto} />
            <label style={{ marginBottom: "5px" }}>Description</label>
            <CKEditor
              editor={ClassicEditor}
              data={product.productDescription}
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
};

export default AddProduct;
