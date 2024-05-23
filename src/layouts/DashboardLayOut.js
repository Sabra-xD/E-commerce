import React from 'react';
import './styles.scss';
import AdminNavBar from '../components/AdminNavBar.js';

const DashboardLayout = (props) => {
    return (
        <div className="admin">
                <AdminNavBar/>                
                {props.children}
        </div>
    );
};

export default DashboardLayout;
