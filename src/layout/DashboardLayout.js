import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useUserType from '../hooks/useUserType';
import MyProducts from '../Pages/AddProducts/MyProducts';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
  const { user, loading } = useContext(AuthContext)
  const [userType, userTypeLoading] = useUserType(user.email)



  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center mx-8">
          <Outlet></Outlet>
          <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden absolute left-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-56 bg-base-100 text-base-content">
            {/* admin */}
            {userType === 'admin' && <>
              <Link to='./all-sellers'><li>All Sellers</li></Link>
              <Link to='./all-buyers'>
                <li>All Buyers</li>
              </Link>
              <Link to={'./reported-items'}>Reported Items</Link>
            </>}
            {/* seller */}
            {userType === 'seller' && <>
              <Link to={'./add-product'}>Add a Product</Link>
              <Link to={'./my-products'}>My Products</Link>
            </>}
            {/* buyers */}
            {userType === 'user' && <>
              <Link to={'./my-orders'}>My Orders</Link>
            </>}
          </ul>
        </div>
      
       
      </div>
    </div>
  );
};

export default DashboardLayout;