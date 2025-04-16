import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import axios from 'axios'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name === '' || formData.email === '' || formData.password === '' || formData.password2 === '') {
      toast.error('Any of field cannot be empty! ', { position: 'top-center' })
      return;
    } else {
      if (formData.password !== formData.password2) {
        toast.error('Confirm Password is not same as password !', { position: 'top-center' });
        return;
      }
      if (formData.password.length < 6) {
        toast.error('Password is too short ! ', { position: 'top-center' })
        return;
      }
    }
    try {
      axios.post('/login/register', formData)
        .then((response) => {
          console.log(response.data);
          toast.success('Registration Successfull !', { position: 'top-center' });
          window.location.href = '/login';
        })
        .catch((error) => {
          console.log(error);
          toast.error('Registration Failed !', { position: 'top-center' });
        });
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
                value={formData.password2}
                onChange={handleChange}
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
    </>
  );
};

export default RegisterForm;
