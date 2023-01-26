import React, { useEffect, useState } from 'react';

const useUserType = (email) => {
  console.log(email);
  const [userType,setUserType]=useState()
  const [userTypeLoading,setUserTypeLoading]=useState(true)
  useEffect(()=>{
    if(email){
      fetch(`http://localhost:5000/users/${email}`)
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