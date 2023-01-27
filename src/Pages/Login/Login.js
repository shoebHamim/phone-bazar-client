import { async } from '@firebase/util';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useToken from '../../hooks/useToken';


const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const { register, formState: { errors }, handleSubmit } = useForm()
  const { signIn, signInWithGoogle,loading,setLoading } = useContext(AuthContext)
  const [loginError, setLoginError] = useState()
  const [userEmail,setUserEmail]=useState()
  const [token]=useToken(userEmail)
  if(token){
    navigate(from, { replace: true })
  }
  // save user to db for google sign in
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
        return data
      })
  }
  const handleLogin = data => {
    signIn(data.email, data.password)
      .then(res => {
        setLoading(false)
        setLoginError('')
        setUserEmail(res.user.email)
      })
      .catch(e => {
        setLoginError(e.message)
        setLoading(false)
      })
  }
  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then(res => {

        const email= res.user.email
        fetch(`https://phone-bazar-server.vercel.app/users/${email}`)
        .then(res=>res.json())
        .then(data=>{
          if(JSON.stringify(data) === JSON.stringify({})){
              res= saveUserToDB(email.split('@')[0],email,'','user')
          }
          setUserEmail(res.user.email)
         
        })
       
        
      })
      .catch(e => console.log(e))
  }
  return (
    <div className='h-[800px]  flex justify-center items-center'>
      <div className='w-96'>
        <h2 className='text-center text-2xl font-semibold'>Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full">
            <label className="label"><span className="label-text">
              Email</span></label>
            <input type='email' {...register("email", { required: 'Email is required' })}
              className="input input-bordered w-full" />
            {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
          </div>
          <div className="form-control w-full">
            <label className="label"><span className="label-text">
              Password</span></label>
            <input type='password' {...register("password", {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters long' }
            })}
              className="input input-bordered w-full " />
            {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
            <label className="label"><span className="label-text">
              Forgot Password?</span></label>
            {loginError && <p className='text-red-500 mb-2'>{loginError}</p>}
          </div>
          <input value={'Login'} className='btn w-full' type="submit" />
          {loading && <progress className="progress"></progress>}
        </form>
        <p className='mt-6'>New to Doctor's Portal? <Link to={'/signup'} className='text-primary'>Create New Account</Link></p>
        <div className="divider">OR</div>
        <button onClick={handleSignInWithGoogle} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default Login;