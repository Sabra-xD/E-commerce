/* eslint-disable react-hooks/exhaustive-deps */

import './default.scss';
import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './components/Authentication/Login';
import { readUserInfo } from './rtk/user/userSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Register from './components/Authentication/Register';
import ResetPassword from './components/Authentication/ResetPassword';
import AdminLayOut from './layouts/AdminLayOut';
import WithAdminAuth from './hoc/WithAdminAuth';
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
import DashboardLayOut from './layouts/DashboardLayOut';
import MyAccount from './pages/MyAccount';
import OrderDetails from './components/OrderDetails';
import BillingForm from './components/BillingForm';
import { readOrderHistory } from './rtk/orders/orderSlice';
import WithAuth from './hoc/withAuth';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (dispatch(readUserInfo)) {
      dispatch(readProducts);
      dispatch(readOrderHistory);
      dispatch(readCartList);
    }
  }, []);

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
        }/>

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
          <WithAuth>
            <MainLayout>
              <CheckOut />
            </MainLayout>
          </WithAuth>
        }/>

        <Route path="myaccount" element={
          <WithAuth>
            <MainLayout>
              <DashboardLayOut>
                <MyAccount />
              </DashboardLayOut>
            </MainLayout>
          </WithAuth>
        }/>

        <Route path="orderDetails/:orderID" element={
          <WithAuth>
            <MainLayout>
              <DashboardLayOut>
                <OrderDetails />
              </DashboardLayOut>
            </MainLayout>
          </WithAuth>
        }/>

        <Route path="delivery-information" element={
          <WithAuth>
            <MainLayout>
              <BillingForm />
            </MainLayout>
          </WithAuth>
        }/>

        <Route path="reset-password" element={
          <MainLayout>
            <ResetPassword />
          </MainLayout>
        }/>

        <Route path="product-details/:documentID" element={
          <WithAuth>
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          </WithAuth>
        }/>

        <Route path="admin" element={
          <WithAdminAuth>
            <AdminLayOut>
              <DashboardLayOut>
                <Admin />
              </DashboardLayOut>
            </AdminLayOut>
          </WithAdminAuth>
        }/>

        <Route path="payment" element={
          <WithAuth>
            <MainLayout>
              <PaymentPage />
            </MainLayout>
          </WithAuth>
        }/>

        <Route path="success/:sessionID" element={
            <MainLayout>
              <Sucess />
            </MainLayout>        
        }/>

        <Route path="cancel" element={
          <WithAuth>
            <MainLayout>
              <Fail />
            </MainLayout>
          </WithAuth>
        }/>
      </Routes>
    </div>
  );
}

export default App;
