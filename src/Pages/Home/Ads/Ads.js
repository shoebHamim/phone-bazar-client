import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Product from '../../Products/Products/Product';

const Ads = () => {
  const {data:advertised=[]}=useQuery({queryKey:['advertised'],
queryFn:async()=>{
  const res= await fetch('http://localhost:5000/products/advertised')
  const data= await res.json()
  return data
}})
// console.log(advertised);
if(!advertised.length){
  return <></>
}

  return (
    <div>
      <h1 className='text-2xl text-center my-8 font-semibold'>Advertisements</h1>
      <div  className='grid lg:grid-cols-2'>
        {advertised.map(p=><Product product={p} key={p._id}></Product>)}
      </div>
    </div>
  );
};

export default Ads;