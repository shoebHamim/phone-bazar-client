import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Product from './Product';

const Products = () => {
  const products=useLoaderData()
  // console.log(products);
  return (
    <div className='grid grid-cols-2 gap-8'>
      {products.map(p=><Product key={p._id} product={p}></Product>)}
    </div>
  );
};

export default Products;