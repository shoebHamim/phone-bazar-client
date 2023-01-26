import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthProvider';

import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';


const AddProducts = () => {
  const { register, handleSubmit, formState: { errors },reset } = useForm()
  const {user}=useContext(AuthContext)
  const [selected, setSelected] = React.useState(Date);
  const today =selected.split(' ').slice(1,4).join(' ')
  const [user_db,setUser_db]=useState()
  const onSubmit = (data) => {
    fetch(`http://localhost:5000/users/${user.email}`)
    .then(res=>res.json())
    .then(data=>setUser_db(data))
    console.log(user_db);
    const {name,location,description,originalPrice,resellPrice,phone,photo,productType,productCondition,duration}=data
    const product={
    cat_id:parseInt(productType),
    name:name,
    location:location,
    resale_price:resellPrice,
    original_price:originalPrice,
    years_used:duration,
    posting_time:today,
    seller_name:user.displayName,
    seller_email:user.email,
    img:photo,
    desc:description,
    phone:phone,
    status:'available',
    advertise:false,
    verified: user_db.verified
    }
    // console.log(product);
    fetch('http://localhost:5000/products',{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(product),
    })
    .then(res=>res.json())
    .then(data=>{
      reset()
      toast.success('Product has been added!')
    })
  }

 
  return (
    <div>
      <Link to={`/my-products/${user.email}`} className='btn btn-sm '>My Products</Link>
      <div className='  flex justify-center '>
        <div className='w-96'>
          <h2 className='text-center text-2xl font-semibold'>Add a Product</h2>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="form-control w-full">
              <label className="label"><span className="label-text">
                Product Name </span></label>
              <input type='text'
                className="input input-bordered w-full" {...register('name', {
                  required: 'Enter a Name',
                })} />
              {errors.name && <p className='text-xs text-red-600'>{errors.name.message}</p>}
            </div>
            <div className="form-control w-full">
              <label className="label"><span className="label-text">
                Original Price</span></label>
              <input type='number'
                className="input input-bordered w-full" {...register('originalPrice', {
                  required: 'Give a price',
                })} />
              {errors.price && <p className='text-xs text-red-600'>{errors.price.message}</p>}
            </div>
            <div className="form-control w-full">
              <label className="label"><span className="label-text">
                Asking/Resell Price</span></label>
              <input type='number'
                className="input input-bordered w-full" {...register('resellPrice', {
                  required: 'Give a price',
                })} />
              {errors.price && <p className='text-xs text-red-600'>{errors.price.message}</p>}
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text">
                Location</span></label>
              <input type='text'
                className="input input-bordered w-full" {...register('location', {
                  required: 'Give your location',
                })} />
              {errors.Location && <p className='text-xs text-red-600'>{errors.Location.message}</p>}
            </div>
            <div className="form-control w-full">
              <label className="label"><span className="label-text">
                Mobile Number</span></label>
              <input type='text'
                className="input input-bordered w-full" {...register('phone', {
                  required: 'Enter your phone number',
                })} />
              {errors.phone && <p className='text-xs text-red-600'>{errors.phone.message}</p>}
            </div>
            <p className='mt-2'>Condition</p>
            <select {...register('productCondition')} className="select select-bordered w-full max-w-xs ">
              <option value={'excellent'}>Excellent</option>
              <option value={'good'}>Good</option>
              <option value={'fair'}>Fair</option>
            </select>
            <p className='mt-2'>Product Category</p>
            <select {...register('productType')} className="select select-bordered w-full max-w-xs ">
              <option value={'1'} >Budget</option>
              <option value={'2'}>MidRange</option>
              <option value={'3'}>Flagship</option>
            </select>
            <div className="form-control w-full">
              <label className="label"><span className="label-text">
                Description</span></label>
              <textarea type='text'
                className="input input-bordered w-full" {...register('description', {
                  required: 'Give a description',
                })} />
              {errors.description && <p className='text-xs text-red-600'>{errors.description.message}</p>}
            </div>
            <div className="form-control w-full">
              <label className="label"><span className="label-text">
                Usage Duration in Year</span></label>
              <input type='text'
                className="input input-bordered w-full" {...register('duration', {
                  required: 'Required',
                })} />
              {errors.duration && <p className='text-xs text-red-600'>{errors.duration.message}</p>}
            </div>
            <div className="form-control w-full">
              <label className="label"><span className="label-text">
                Photo URL</span></label>
              <input type='text'
                className="input input-bordered w-full" {...register('photo', {
                  required: 'Photo URL',
                })} />
              {errors.address && <p className='text-xs text-red-600'>{errors.address.message}</p>}
            </div>

            <input value={'Submit'} className='btn w-full my-4' type="submit" />
            {false && <progress className="progress text-center"></progress>}
          </form>

        </div>
      </div>
    </div>
  );
};

export default AddProducts;