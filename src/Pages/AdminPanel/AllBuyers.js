import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
const AllBuyers = () => {
  const {data:allBuyers=[],refetch}=useQuery({queryKey:['all-buyers'],queryFn:async()=>{
    const res=await fetch('http://localhost:5000/all-buyers',
   { headers:{
      authorization: `bearer ${localStorage.getItem('accessToken')}`
    }})
    const data=await res.json()
    return data
  }})
  // console.log(allBuyers);
  const deleteUser=(id)=>{
    const confirmation=window.confirm('Are you sure you want to delete?')
    if(!confirmation){
      return
    }
    fetch(`http://localhost:5000/users/${id}`,{
      headers:{
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
      method:'DELETE'
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.acknowledged){
        toast.success('Buyer Deleted!')
        refetch()
        
      }
    })
  }
  return (
    <div className='w-full ml-4'>
      <h1 className='text-xl font-semibold text-center my-6'>All Buyers</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allBuyers.map((buyer,i)=>
              <tr key={buyer._id} className="hover">
              <th>{i+1}</th>
              <td>{buyer.name}</td>
              <td><button onClick={()=>deleteUser(buyer._id)} className='btn btn-error btn-sm'>Delete</button></td>
              </tr>
            )}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBuyers;