import React, { useEffect } from 'react';
import ShopMen from './../../assets/shopMens.jpg';
import ShopWomen from './../../assets/shopWomens.jpg';
import './styles.scss';
import { fetchProductsController } from '../../rtk/products/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../rtk/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Directory = props => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const navigator = useNavigate();
  useEffect(()=>{
    
    dispatch(fetchProductsController(user,{filterType:''}));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])
    return (
      <div className="directory">
        
        <div className="wrap">

          <div
            className="item"
            style={{
              backgroundImage: `url(${ShopWomen})`
            }}
          >

            <button onClick={()=>{
              navigator("/search/womens");
            }} className="button" id='female'>
              Shop Women
            </button>

          </div>

          <div
            onClick={()=>{
              navigator("/search/mens");
            }}
            className="item"
            style={{
              backgroundImage: `url(${ShopMen})`
            }}
          >
            <button className="button" id="male">Shop Men</button>
          </div>
        </div>
      </div>
    );
  };

export default Directory;