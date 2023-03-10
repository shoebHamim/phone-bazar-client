import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const PrivateRoute = ({children}) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation();
  if (loading) {
    return <div className='text-center'>
      <progress className="progress w-56 "></progress>
    </div>
  }
  if (user?.uid) {
    return children
  }
  return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;
