import React, { useState, useEffect } from 'react';
import './styles2.scss';
import Logo from './../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../rtk/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const naviate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user.user);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 980);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const LoginOutButton = () =>{
    return(
      
      user===null ? ( <Link to="/login">Login</Link>
      ): (
        <button onClick={()=>{
          dispatch(logOut).then(naviate('/'));
        }}>Log Out</button>
      )
      
    )
  }


  const renderNavigation = () => {
    if (isMobile) {
      return (
        <div className="dropdown">
          <button className="dropbtn">Menu</button>
          <div className="dropdown-content">
          <Link to="/">Home Page</Link>
          <Link to="/register">Register</Link>
          {
            LoginOutButton()
          }
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <Link to="/">Home Page</Link>
          <Link to="/register">Register</Link>
          {
            LoginOutButton()
          }
          
        </div>
      );
    }
  };

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <img src={Logo} alt="SimpleTut Logo" />
        </div>
        {renderNavigation()}
      </div>
    </header>
  );
};

export default Header;
