import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='text-6xl font-bold text-orange-600 '>Oops!</h1>
      <h2 className='text-2xl font-semibold mt-6'>404 Page Not Found</h2>
      <Link to={'/'} className='btn rounded-full btn-success text-white btn-sm mt-4'>Go To Hompage</Link>

    </div>
  );
};

export default NotFound;