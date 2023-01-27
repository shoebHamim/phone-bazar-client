import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import  { AuthContext } from '../../../context/AuthProvider';
import useUserType from '../../../hooks/useUserType';
import BookingModal from '../Bookings/BookingModal';
import Product from './Product';

const Products = () => {
  const {user}=useContext(AuthContext)
  const [userType,userTypeLoading]=useUserType(user.email)

  const products=useLoaderData()
  const [selectedItem,setSelectedItem]=useState()
  return (
    <div className='grid sm:grid-cols-2 gap-8'>
      {products.map(p=><Product userType={userType} setSelectedItem={setSelectedItem} key={p._id} product={p}></Product>)}
      <BookingModal selectedItem={selectedItem} user={user}></BookingModal>
    </div>

  );
};

export default Products;