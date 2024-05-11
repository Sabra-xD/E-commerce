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
  
  const user = useSelector(state=>state.user?.user);

  const [currentUser,setCurrentUser] = useState('');

  const [loading,setisLoading] = useState(true);


 
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 980);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(()=>{
  
    console.log("loading: ",loading);

    if(user){
      console.log("The user is correct: ",user);
      setisLoading(false);
    }else{
      setisLoading(true);
    }

    console.log("loading after the if user: ",loading);


    if(!loading){
      setCurrentUser(user?.displayName);
      console.log("The current user inside the useEffect: ",currentUser);
    }

  });

  const UserControlls = () =>{
    console.log("The user value inside the UserControlls: ",user);
    return(

      user===null ? ( 
        <>
           <Link to="/register">Register</Link>
           <Link to="/login">Login</Link>
        </>
        ): (
            <>
              <Link  to="">My Account</Link>
              <Link style={{color:"red"}} onClick={()=>{
                dispatch(logOut).then(naviate('/'));
              }}>Log Out</Link>
            </>
        )
      
    //   loading ? (
    //     <p>Loading....</p>
    //   ) : ( user===null ? ( 
    //     <>
    //        <Link to="/register">Register</Link>
    //        <Link to="/login">Login</Link>
    //     </>
    //     ): (
    //         <>
    //           <Link  to="">My Account</Link>
    //           <Link style={{color:"red"}} onClick={()=>{
    //             dispatch(logOut).then(naviate('/'));
    //           }}>Log Out</Link>
    //         </>
    //     ))
      
    // )

    )
  }


  const renderNavigation = () => {
    if (isMobile) {
      return (
        <div className="dropdown">
          <button className="dropbtn">Menu</button>
          <div className="dropdown-content">
          <Link to="/">Home Page</Link>
          {
            UserControlls()
          }
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <Link to="/">Home Page</Link>
          {
            UserControlls()
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
