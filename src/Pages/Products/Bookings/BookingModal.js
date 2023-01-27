import React from 'react';
import { toast } from 'react-hot-toast';

const BookingModal = ({ user, selectedItem }) => {
  const { displayName, email } = user

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const booking = {
      name: displayName,
      email: email,
      product: selectedItem,
      meetingLocaton: form.meetingLocation.value,
      phone: form.phone.value,
    }
    fetch('https://phone-bazar-server.vercel.app/bookings', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(booking),
    })
      .then(res => {
        toast.success(`${selectedItem.name} is successfully booked!`)
        document.getElementById('booking-modal').checked = false

      })



  }

  // console.log(user);
  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold mb-2">Book this phone</h3>
          <form onSubmit={handleBookingSubmit}>
            <input defaultValue={displayName} type="text" className='mb-2 input input-bordered w-full' disabled />
            <input defaultValue={email} type="text" className='mb-2 input input-bordered w-full' disabled />
            <input defaultValue={selectedItem?.name} disabled type="text" className='mb-2 input input-bordered w-full' />
            <input defaultValue={selectedItem?.resale_price} disabled type="text" className='mb-2 input input-bordered w-full' />
            <input name='phone' required placeholder='Enter Your Phone Number' type="text" className='mb-2 input input-bordered w-full' />
            <input name='meetingLocation' required placeholder='Enter meeting Location' type="text" className='mb-2 input input-bordered w-full' />
            <button className='btn btn-outline btn-success'>Submit</button>
            <p className="py-4"></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;