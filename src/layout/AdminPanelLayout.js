import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const AdminPanelLayout = () => {
  return (
    <div className='mx-8'>
      <Navbar></Navbar>
      <div className='flex'>
        <ul className="menu bg-base-200 w-56 p-2 rounded-box">
          <Link to='/admin'><li>All Sellers</li></Link>
          <Link to='admin/all-buyers'>
            <li>All Buyers</li>
          </Link>
        </ul>
        <Outlet ></Outlet>
      </div>
    </div>
  );
};

export default AdminPanelLayout;