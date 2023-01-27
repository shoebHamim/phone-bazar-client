import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';

const ReportedItems = () => {
  const {data:reportedItems=[],refetch}=useQuery({queryKey:['reported-items'],
queryFn:async()=>{
  const res=await fetch('http://localhost:5000/products/reported',{
    headers:{authorization:
    `bearer ${localStorage.getItem('accessToken')}`}
  })
  const data = await res.json()
  return data
}})
console.log(reportedItems);
if(reportedItems.message){
  return <div className='text-2xl text-red-600'>{reportedItems.message}</div>
}
const handleDelete = (id) => {
  const confirm = window.confirm('Are you sure you want to delete?')
  if (confirm) {
    console.log(id);
    fetch(`http://localhost:5000/my-products/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        toast.success('Product has been deleted')
        refetch()
      })
  }
}
  return (
    <div className='w-full ml-4'>
    <h1 className='text-xl font-semibold text-center my-6'>Reported Items</h1>
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
          {reportedItems.map((p,i)=>
            <tr key={p._id} className="hover">
            <th>{i+1}</th>
            <td>{p.name}</td>
            <td><button onClick={()=>handleDelete(p._id)} className='btn btn-error btn-sm'>Delete</button></td>
            </tr>
          )}
          
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default ReportedItems;