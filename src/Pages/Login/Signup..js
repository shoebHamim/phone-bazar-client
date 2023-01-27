import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useToken from '../../hooks/useToken';
const Signup = () => {
  const { createUser, updateUser,loading } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [createdUserEmail, setCreatedUserEmail] = useState('')
  const navigate = useNavigate()
  const [token] = useToken(createdUserEmail)
  if (token) {
    navigate('/')
  }

  const saveUserToDB = (name, email, address,accountType) => {
    const user = { name: name, email: email, address: address,accountType:accountType }
    fetch('https://phone-bazar-server.vercel.app/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        setCreatedUserEmail(email)
        toast.success('User created successfully!')
      })
  }
  const OnSubmit = (data) => {
    const {name,address,password,email,accountType}=data
    console.log(data);
    const userInfo = {
      displayName: data.name,
    }
    createUser(email,password)
      .then(res => {
        updateUser(userInfo)
          .then(res => saveUserToDB(name,email,address,accountType))
          .catch(e => console.log(e))
      })
      .catch(error => console.log(error)) 
  }
  
  return (
    <div className='h-[800px]  flex justify-center items-center'>
      <div className='w-96'>
        <h2 className='text-center text-2xl font-semibold'>Sign Up</h2>
        <form onSubmit={handleSubmit(OnSubmit)} >
          <div className="form-control w-full">
            <label className="label"><span className="label-text">
              Name</span></label>
            <input type='text'
              className="input input-bordered w-full" {...register('name', {
                required: 'Enter Your Name',
              })} />
            {errors.name && <p className='text-xs text-red-600'>{errors.name.message}</p>}
          </div>
          <div className="form-control w-full">
            <label className="label"><span className="label-text">
              Address</span></label>
            <input type='text'
              className="input input-bordered w-full" {...register('address', {
                required: 'Enter Your Address',
              })} />
            {errors.address && <p className='text-xs text-red-600'>{errors.address.message}</p>}
          </div>
          <div className="form-control w-full">
            <label className="label"><span className="label-text">
              Email</span></label>
            <input type='text'
              className="input input-bordered w-full" {...register('email', {
                required: 'Email required',
              })} />
            {errors.email && <p className='text-xs text-red-600'>{errors.email.message}</p>}

          </div>
          <div className="form-control w-full">
            <label className="label"><span className="label-text">
              Password</span></label>
            <input type='password'
              className="input input-bordered w-full " {...register('password', {
                required: 'Password Required',
                minLength: { value: 6, message: 'Password must be at least 6 characters long' },
                pattern: { value: /^[A-Za-z0-9]+$/i, message: 'Password must be strong' }
              })} />
            {errors.password && <p className='text-xs text-red-600'>{errors.password.message}</p>}
          </div>
          <select {...register('accountType')} className="select select-bordered w-full max-w-xs mt-4">
            <option value={'user'} selected>User</option>
            <option value={'seller'}>Seller</option>
          </select>
            
          <input value={'Register'} className='btn w-full my-4' type="submit" />
         {loading&&  <progress className="progress text-center"></progress>}
        </form>
        <p>Already have an account? <Link to={'/login'} className='text-primary'>Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;