import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Product from '../Products/Products/Product';
const Orders = () => {
  const {user}=useContext(AuthContext)
  const {data:bookings=[]}=useQuery({queryKey:['bookings'],queryFn:async()=>{
    const res=await fetch(`http://localhost:5000/user/bookings/${user.email}`)
    const data=await res.json()
    return data
    },

  })
  console.log(bookings);
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