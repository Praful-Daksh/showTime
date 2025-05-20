import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const RefreshHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isToken, setIsToken] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      setIsToken(true)
      if (location.pathname === '/' || location.pathname === '/register') {
        navigate('/dashboard/home', { state: { isAuth: isToken } })
      }
      else if (location.pathname === '/login') {
        navigate('/dashboard/home')
      }
    }
  }, [location, navigate, isToken])
  return (
    null
  )
}

export default RefreshHandler