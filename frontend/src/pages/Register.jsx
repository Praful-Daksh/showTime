import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { ScaleLoader } from 'react-spinners'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
  }

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name === '' || formData.email === '' || formData.password === '' || formData.password2 === '') {
      toast.error('Any of field cannot be empty! ', { position: 'top-center' })
      return;
    } else {
      if (formData.password !== password2) {
        toast.error('Confirm Password is not same as password !', { position: 'top-center' });
        return;
      }
      if (formData.password.length < 6) {
        toast.error('Password is too short ! ', { position: 'top-center' })
        return;
      }
    }
    try {
      setLoading(true)
      const url = 'https://backshow.onrender.com/auth/register'
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      setLoading(false)
      if (data.success) {
        toast.success('Registration Successfull !', { position: 'top-center' })
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      } else {
        toast.error(data.message, { position: 'top-center' })
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="register-container">
        <div className="auth-formArea">
          <h2>Ready to Be a Host..?</h2>
          <h3>Create an account to create and work on your events.</h3>
          <form onSubmit={handleSubmit}>
            <div className="auth-form">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="off"
              />

              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
              />

              <label htmlFor="password">Create Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
              />

              <label htmlFor="password2">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password2"
                name="password2"
                placeholder="Confirm your password"
                value={password2}
                onChange={handlePassword2}
                autoComplete="off"
              />

              <div className="auth-showPassword ">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={togglePassword}
                />
                <label htmlFor="showPassword">Show Password</label>
              </div>

              <button type="submit">Sign Up</button>
            </div>
          </form>

          <p>Already Registered? <Link to="/login">Sign In</Link></p>
        </div>
        <div className="register-imageArea"></div>
      </div>
      {
        loading ?
          <div className='overlay-loader'><ScaleLoader color='#000000' size={50} /></div>
          : null
      }
    </>
  );
};

export default RegisterForm;
