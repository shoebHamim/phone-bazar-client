import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Product from '../Products/Products/Product';
const Orders = () => {
  const bookings=useLoaderData()
  // console.log(bookings);
  return (
    <div>
      <h1 className='text-2xl text-center font-semibold my-6'>My Orders:</h1>
      <div className='grid grid-cols-2 gap-8'>
      {bookings.map(b=>
        <Product product={b.product} pay={b.product}></Product>)}
      </div>
    </div>
  );
};

export default Orders;