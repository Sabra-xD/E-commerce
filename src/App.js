
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
import AdminPage from './pages/AdminPage';
import WithAdminAuth from './hoc/WithAdminAuth';

function App() {
  const dispatch = useDispatch();


  useEffect(()=>{
    console.log("Should read info");
    dispatch(readUserInfo);
  },[dispatch]);


  return (
    <div className='App'>
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

      <Route path="reset-password" element={
        <MainLayout>
          <ResetPassword />
        </MainLayout>
      }/>



      <Route path="admin" element={
        //We need to add the WithAuth around it, make sure they have permission.
        <WithAdminAuth>
            <AdminLayOut>
              <AdminPage />
          </AdminLayOut>
        </WithAdminAuth>
     
      } />

      
      </Routes>

    </div>
  );
}

export default App;
