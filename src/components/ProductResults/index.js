import './styles.scss';
import { selectCurrentUser } from "../../rtk/user/userSlice";
import { fetchProductsController, getAllProducts } from "../../rtk/products/productSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from './Product';
import FormSelect from '../Form/FormSelect';
// import { useParams } from 'react-router-dom';




const ProductResults = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);

    // const {filterTypeFromLink} = useParams();


    const [filterType, setFilterType] = useState('');


    //We've got this, we need to somehow filter it.

    const productsList = useSelector(getAllProducts);


    const handleFilter = (e) => {
        // navigator(`/search/${nextFilter}`);
        setFilterType(e.target.value);
      };
    

    useEffect(() => {

        dispatch(fetchProductsController(user,filterType));


    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[filterType]);

    // useEffect(()=>{
    //     if(filterTypeFromLink){
    //         console.log("From the params: ",filterTypeFromLink);
    //     setFilterType(filterTypeFromLink);
    // }
    
    // },[]);

    if (!Array.isArray(productsList)) return null;
    if (productsList.length < 1) {

      return (
        <div className="products">
          <p>
            No search results.
          </p>
        </div>
      );
    }


    
    const configFilters = {
        defaultValue: filterType,
        options: [{
          name: 'Show all',
          value: ''
        }, {
          name: 'Mens',
          value: 'mens'
        }, {
          name: 'Womens',
          value: 'womens'
        }],
        handleChange: handleFilter
      };

    return(

        <div className="wrapper">
            <h1>
                Browser Products
            </h1>
            <FormSelect {...configFilters}/>
                {



                }
                <div className="productsList">
                {Array.isArray(productsList) && productsList.length > 0 && productsList.map((product, index) => {
                                                    

                    return(
                            <Product {...product} key={index}/>
                          )
                    })}
                </div>
         
        </div>
    )
}


export default ProductResults;