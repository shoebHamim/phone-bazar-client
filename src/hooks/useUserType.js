import React, { useEffect, useState } from 'react';

const useUserType = (email) => {

  const [userType,setUserType]=useState()
  const [userTypeLoading,setUserTypeLoading]=useState(true)
  useEffect(()=>{
    if(email){
      fetch(`https://phone-bazar-server.vercel.app/users/${email}`)
      .then(res=>res.json())
      .then(data=>{
        setUserType(data.accountType)
        setUserTypeLoading(false)
      })
    }
  },[email])
  return [userType,userTypeLoading]
};

export default useUserType;