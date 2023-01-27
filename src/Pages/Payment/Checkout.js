import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Checkout = ({ booking }) => {

  const price=booking.product.resale_price
  const name=booking.name
  const email=booking.email
  const stripe = useStripe()
  const elements = useElements()
  const [cardError, setCardError] = useState()
  const [success, setSuccess] = useState()
  const [transitionID,setTransitionID ] = useState()
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads

    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem('accessToken')}`,
      },


      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }
    const card = elements.getElement(CardElement)
    if (card === null) {
      return
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })
    if (error) {
      console.log(error);
      setCardError(error.message)

    }
    else {
      setCardError('')
    }
    setSuccess('')
    setProcessing(true)
    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email,

          },
        },
      },
    );

    if(confirmError){
      setCardError(confirmError.message)
      setProcessing(false)
      return
    }
    // console.log(paymentIntent);
    if(paymentIntent.status==="succeeded"){
      const payment={
        price,
        transactionID:paymentIntent.id,
        email,
        bookingId:booking._id,


      }
      fetch('http://localhost:5000/payments',{
        method:'POST',
        headers:{
          'content-type':'application/json'
          ,authorization:`bearer ${localStorage.getItem('accessToken')}`
        },
        body:JSON.stringify(payment)
      })
      .then(res=>res.json())
      .then(data=>{
        fetch(`http://localhost:5000/products/paid/${booking.product._id}`,{
          method:'PUT'
        })
        .then(res=>res.json())
        .then(data=>{
          fetch(`http://localhost:5000/bookings/${booking._id}`,{
            method:'PUT'
          })
          .then(res=>res.json())
          .then(data=>console.log(data))
        })


      })
      setSuccess('Payment was Successful!')
      setTransitionID(paymentIntent.id)
      setProcessing(false)
      
    }
   
  }
  return (
    <form onSubmit={handleSubmit}>
     
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className='btn btn-sm btn-primary mt-4'
        type="submit" disabled={!stripe || !clientSecret||processing}>
        Pay
      </button>
      <br />
      {processing && <progress className="progress "></progress>}
      <p className='text-red-600'>{cardError}</p>
      {
        success && <div>
          <p className='text-green-500 mt-4 text-lg text-semibold'>{success}</p>
          <p>Transaction ID <span className='font-bold'>{transitionID}</span></p>
        </div>
      }
    </form>
  );
};

export default Checkout;