import { itMatchesOne } from 'daisyui/src/lib/postcss-prefixer/utils';
import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import BookingModal from '../Bookings/BookingModal';
import Product from './Product';

const Products = () => {
  const {user}=useContext(AuthContext)
  const products=useLoaderData()
  const [selectedItem,setSelectedItem]=useState()
  return (
    <div className='grid grid-cols-2 gap-8'>
      {products.map(p=><Product setSelectedItem={setSelectedItem} key={p._id} product={p}></Product>)}
      <BookingModal selectedItem={selectedItem} user={user}></BookingModal>
    </div>

  );
};

export default Products;