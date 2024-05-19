/* eslint-disable react-hooks/exhaustive-deps */

import './default.scss';
import HomePage from './pages/HomePage';
import { Routes,Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './components/Authentication/Login';
import { readUserInfo } from './rtk/user/userSlice';
import {useDispatch} from 'react-redux';
import { useEffect } from 'react';
import Register from './components/Authentication/Register';
import ResetPassword from './components/Authentication/ResetPassword';
import AdminLayOut from './layouts/AdminLayOut';
import WithAdminAuth from './hoc/WithAdminAuth';
import CurrentUser from './components/CurrentUser/currentuser';
import AdminToolbar from './components/AdminToolbar';
import Admin from './components/Admin';
import { readProducts } from './rtk/products/productSlice';
import SearchPage from './pages/SearchPage';
import ProductDetails from './components/ProductDetails';
import { readCartList } from './rtk/cart/cartSlice';
import CheckOut from './components/CheckOut';
import PaymentPage from './pages/PaymentPage';
import Sucess from './components/Response/Sucess';
import Fail from './components/Response/Fail';
function App() {
  const dispatch = useDispatch();


  useEffect(()=>{
    if(dispatch(readUserInfo)){
      dispatch(readProducts);
      dispatch(readCartList)
    }
  },[]);


  return (
    <div className='App'>

      <AdminToolbar />
      <Routes>

        <Route path="/" element={
  
            <MainLayout>
              <HomePage />
            </MainLayout>
        }/>

        <Route path="register" element={
          <MainLayout>
            <Register />
          </MainLayout>
        }/>


        <Route path="login" element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />

      <Route path="search" element={
        <MainLayout>
          <SearchPage />
        </MainLayout>
      }/>


<Route path="search/:filterTypeFromLink" element={
        <MainLayout>
          <SearchPage />
        </MainLayout>
      }/>

  <Route path="checkout" element={
    <MainLayout>
      <CheckOut />
    </MainLayout>
  }></Route>



      <Route path="reset-password" element={
        <MainLayout>
          <ResetPassword />
        </MainLayout>
      }/>


      <Route path="product-details/:documentID" element = {
        <MainLayout>
          <ProductDetails />
        </MainLayout>
      } />



      <Route path="admin" element={
        //We need to add the WithAuth around it, make sure they have permission.
        <WithAdminAuth>
            <AdminLayOut>
              <Admin />
          </AdminLayOut>
        </WithAdminAuth>
     
      } />

      <Route  path="current" element={
        <CurrentUser />
      }/>

      <Route path="payment" element={
        <MainLayout>
          <PaymentPage />
        </MainLayout>
      }/>
      
      <Route path="success" element={
        <MainLayout>
                  <Sucess />
        </MainLayout>
      }/>

      <Route path="fail" element={
        <MainLayout>
          <Fail/>
        </MainLayout>
      }/>

      </Routes>

    </div>
  );
}

export default App;
