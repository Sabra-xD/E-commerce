import './styles.scss';
import { selectCurrentUser } from "../../rtk/user/userSlice";
import { fetchProductsController, getAllProducts } from "../../rtk/products/productSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from './Product';
import FormSelect from '../Form/FormSelect';
import LoadMore from '../LoadMore/LoadMore';
import { useParams } from 'react-router-dom';




const ProductResults = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);

    const {filterTypeFromLink} = useParams();


    const [filterType, setFilterType] = useState('');


    //This only returns the data.
    const products = useSelector(getAllProducts);

    const { data, queryDoc, isLastPage } = products;

    const handleFilter = (e) => {
        // navigator(`/search/${nextFilter}`);
        setFilterType(e.target.value);
      };
    

    useEffect(() => {
        if(user) dispatch(fetchProductsController(user,{filterType:filterType}));


    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[filterType,user]);

    useEffect(()=>{
      if(filterTypeFromLink!==""){
        setFilterType(filterTypeFromLink)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    useEffect(()=>{
    },[data]);

    if (!Array.isArray(data)) return null;
    if (data.length < 1) {

      return (
        <div className="products">
          <h4>
            No products to show
          </h4>
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

      const handleLoadMore = () => {
        //Include the start query and presistent data.
        //We send the current data, since Start Doc is supposdly fetching new data.
        dispatch(fetchProductsController(user,{filterType:filterType,StartDoc:queryDoc,presistProduct:data}));
      }

      const configLoadMore= {
        onLoadMoreEvt: handleLoadMore,
      }

    return(

        <div className="wrapper">
            <h1>
                Browser Products
            </h1>
            <FormSelect {...configFilters}/>
                {



                }
                <div className="productsList">
                {Array.isArray(data) && data.length > 0 && data.map((product, index) => {
                                                    

                    return(
                            <Product {...product} key={index}/>
                          )
                    })}


                </div>
                <div style={{"height":"50px"}}>

                </div>
                {isLastPage ? null :  <LoadMore {...configLoadMore}/>}
               
                <div style={{"height":"20px"}}>

</div>

         
        </div>
    )
}


export default ProductResults;