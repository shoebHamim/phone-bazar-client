import { useQuery } from '@tanstack/react-query';
import React from 'react';
import budgetPhone from './smartphone (1).png'
import midrangePhone from './smartphone (3).png'
import flagshipPhone from './smartphone (4).png'
const ProductCount = () => {
  const {data:products=[]}=useQuery({queryKey:['all-product'],
  queryFn:async()=>{
    const res= await fetch('http://localhost:5000/products')
    const data=await res.json()
    return data
  }})

  return (
    <div className='my-20'>
      <h1 className='text-xl text-center font-semibold my-8'>Product Ads Available</h1>
      <div className='grid sm:grid-cols-3'>
      <div className='flex items-center my-4'>
        <img src={budgetPhone} alt="" />
        <div>
        <p className='text-lg'>Budget Phone</p>
        <p className='font-semibold'>Total Ads: {products.filter(p=>p.cat_id===1).length}</p>
        </div>
      </div>
      <div className='flex items-center'>
        <img src={midrangePhone} alt="" />
        <div>
        <p className='text-lg'>Midrange Phone</p>
        <p className='font-semibold'>Total Ads: {products.filter(p=>p.cat_id===2).length}</p>
        </div>
      </div>
      <div className='flex items-center'>
        <img src={flagshipPhone} alt="" />
        <div>
        <p className='text-lg'>Flagship Phone</p>
        <p className='font-semibold'>Total Ads: {products.filter(p=>p.cat_id===3).length}</p>
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default ProductCount;