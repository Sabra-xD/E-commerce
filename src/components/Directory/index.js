import React from 'react';
import ShopMen from './../../assets/shopMens.jpg';
import ShopWomen from './../../assets/shopWomens.jpg';
import './styles.scss';

const Directory = props => {
    return (
      <div className="directory">
        <div className="wrap">
          <div
            className="item"
            style={{
              backgroundImage: `url(${ShopWomen})`
            }}
          >
            <button className="button" id='female'>Shop Women</button>
          </div>
          <div
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