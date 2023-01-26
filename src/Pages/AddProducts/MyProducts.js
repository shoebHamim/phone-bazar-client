import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Product from '../Products/Products/Product';

const MyProducts = () => {
  const { user } = useContext(AuthContext)
  const { data: products = [], refetch } = useQuery({
    queryKey: ['products'], queryFn: async () => {
      const res = await fetch(`http://localhost:5000/my-products/${user.email}`)
      const data = await res.json()
      return data
    }
  })

  // console.log(products);
  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete?')
    if (confirm) {
      console.log(id);
      fetch(`http://localhost:5000/my-products/${id}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          toast.success('Product has been deleted')
          refetch()

        })
    }
  }
  const handleAdvertise = (id) => {
    fetch(`http://localhost:5000/my-products/${id}`, {
      method: 'PUT'
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          refetch()
          toast.success('Product has been successfully advertised')
        }
      })


  }
  return (
    <div>

      <h2 className='text-xl font-semibold text-center'>My Orders</h2>
      <div className='grid sm:grid-cols-2 gap-8 m-4'>
        {products.map(p => <Product product={p} handleAdvertise={handleAdvertise} key={p._id} deleteProduct={handleDelete}></Product>)}
       </div>

    </div>
  );
       
};

        export default MyProducts;