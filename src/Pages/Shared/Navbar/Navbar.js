import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';


const Navbar = () => {
  const { user,logOut,loading } = useContext(AuthContext)
  const userEmail=user?.email
  const [accountType,setAccountType]=useState('user')
  useEffect(()=>{
      fetch(`http://localhost:5000/users/${userEmail}`)
      .then(res=>res.json())
      .then(data=>{
          setAccountType(data.accountType)
      })
  },[user])

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Item 1</a></li>

              <li><a>Item 3</a></li>
            </ul>
          </div>
          <Link to={'/'} className="btn btn-ghost normal-case text-xl">Phone Bazar</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Item 1</a></li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <div className="navbar-end">
          {user?.uid ? <>
         <Link to={`/${accountType}/${user.email}`} className=' mr-2'>Dashboard</Link>
      
            <Link onClick={logOut}  className="btn btn-sm">Logout</Link>
          </> :
            <Link to={'/login'} className="btn">Login</Link>
           
}
        </div>
      </div>
    </div>
  );
};

export default Navbar;