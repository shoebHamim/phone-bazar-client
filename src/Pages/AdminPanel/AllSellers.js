import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';

const AllSellers = () => {
  const { data: allSellers = [], isLoading, refetch } = useQuery({
    queryKey: ['allUsers'], queryFn: async () => {
      const res = await fetch('http://localhost:5000/all-sellers')
      const data = await res.json()
      return data
    }
  })
  if (isLoading) {
    return <progress className="progress w-56 flex justify-center"></progress>
  }
  console.log(allSellers);
  const deleteUser=(id)=>{
    const confirmation=window.confirm('Are you sure you want to delete?')
    if(!confirmation){
      return
    }
    fetch(`http://localhost:5000/users/${id}`,{
      method:'DELETE'
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.acknowledged){
        toast.success('Seller Deleted!')
        refetch()
        
      }
    })
  }
  return (
    <div className='w-full ml-4'>
      <h1 className='text-xl font-semibold text-center my-6'>All Sellers</h1>
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
            {allSellers.map((seller,i)=>
              <tr key={seller._id} className="hover">
              <th>{i+1}</th>
              <td>{seller.name}</td>
            
              <td><button onClick={()=>deleteUser(seller._id)} className='btn btn-error btn-sm'>Delete</button></td>
              </tr>

            )}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSellers;