import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const RefreshHandler = ({setLoggedIn}) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('authToken')){
            setLoggedIn(true)
            if(location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register'){
                navigate('/dashboard/home')
            }

        }
    },[location,navigate,setLoggedIn])
  return (
    null
  )
}

export default RefreshHandler