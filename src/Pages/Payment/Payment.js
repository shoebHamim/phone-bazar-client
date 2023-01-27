import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Checkout from './Checkout';
const stripePromise=loadStripe('pk_test_51MRzglIbHpMqADLEiWBe7x48VZ78dl8JwzyVKTTHAUZlwTs8xTj1D5svQmrliWhnvhKjU0IYkp4sJHBnihGF2xzi00IuVNJbr3')
const Payment = () => {
  const booking=useLoaderData()
  return (
    <div className='mt-12'>
      <h1 className='text-xl font-semibold text-center'>Make Payment </h1>
      <h1 className='text-center mt-2'>Product: {booking.product.name}</h1>
      <h1 className='text-center font-bold mb-8'>Price: {booking.product.resale_price}$</h1>


      <div  className='sm:w-96'>
      <Elements stripe={stripePromise}>
        <Checkout booking={booking}></Checkout>
      </Elements>
      </div>
      
      
    </div>
  );
};

export default Payment;