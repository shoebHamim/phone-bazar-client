import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import Category from './Category';


const Categories = () => {
  const [loading,setLoading]=useState(true)
  const [categories,setCategories]=useState([])
  // using axios for categories api call 
  axios.get('https://phone-bazar-server.vercel.app/categories')
  .then(function (res) {
    setCategories(res.data)
    setLoading(false)
  })
  .catch(function (error) {
    console.log(error);
  })
  

  // const { data: categories = [], isLoading, refetch } = useQuery(
  //   {
  //     queryKey: ['categories'],
  //     queryFn: async () => {
  //       const res = await fetch('http://localhost:5000/categories')
  //       const data = await res.json()
  //       return data
  //     }
  //   })
  if(loading){
    return <div className='text-center'>
      <progress className="progress  w-56"></progress>
    </div>
  }

  return (
    <>
    <h1 className='mt-12  text-2xl font-bold text-center mb-8' >Choose Your Desired Category</h1>
    <div className='grid sm:grid-cols-3 gap-8'>
     {categories.map(c=><Category category={c} key={c._id}></Category>)}


    </div>
    </>
  );
};

export default Categories;