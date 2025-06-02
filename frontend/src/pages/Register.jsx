import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { ScaleLoader } from 'react-spinners'
import api from '../Partials/api';
import { ArrowLeft, Mail, Clock } from 'lucide-react'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const url = api.production;

  // Timer for resend OTP
  React.useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(timer => timer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // handle form data change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // show password toggle
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Validate form data
  const validateForm = () => {
    if (formData.name === '' || formData.email === '' || formData.password === '' || password2 === '') {
      toast.error('All fields are required!', { position: 'top-center' });
      return false;
    }
    if (formData.password !== password2) {
      toast.error('Passwords do not match!', { position: 'top-center' });
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters!', { position: 'top-center' });
      return false;
    }
    return true;
  };

  //  Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      setLoading(false);
      
      if (data.success) {
        toast.success(data.message, { position: 'top-center' });
        setOtpSent(true);
        setUserEmail(formData.email);
        setResendTimer(60);
      } else {
        toast.error(data.message, { position: 'top-center' });
      }
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong, try again later', { position: 'top-center' });
    }
  };

  //  Verify OTP and create account
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP', { position: 'top-center' });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${url}/auth/verify-otp`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail,
          otp: otp
        })
      });
      
      const data = await response.json();
      setLoading(false);
      
      if (data.success) {
        toast.success(data.message, { position: 'top-center' });
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        toast.error(data.message, { position: 'top-center' });
      }
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong, try again later', { position: 'top-center' });
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/auth/resend-otp`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail
        })
      });
      
      const data = await response.json();
      setLoading(false);
      
      if (data.success) {
        toast.success(data.message, { position: 'top-center' });
        setResendTimer(60);
        setOtp(''); 
      } else {
        toast.error(data.message, { position: 'top-center' });
        setOtpSent(false)
      }
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong, try again later', { position: 'top-center' });
    }
  };

  // Go back to registration form
  const handleBackToForm = () => {
    setOtpSent(false);
    setOtp('');
    setResendTimer(0);
  };

  return (
    <div className="bodyWrap">
      <div className="register-container relative">
        <span className="absolute top-2 right-2 bg-transparent text-black px-2 py-1 rounded-md text-xs font-medium cursor-pointer">
          <ArrowLeft className='inline' onClick={() => navigate('/')} /> 
        </span>
        
        <div className="auth-formArea">
          {!otpSent ? (
            // Registration Form
            <>
              <h2>Ready to Be a Host..?</h2>
              <h3>Create an account to create and work on your events.</h3>
              <form onSubmit={handleSendOTP}>
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

                  <div className="auth-showPassword">
                    <input
                      type="checkbox"
                      id="showPassword"
                      checked={showPassword}
                      onChange={togglePassword}
                    />
                    <label htmlFor="showPassword">Show Password</label>
                  </div>

                  <button type="submit" disabled={loading}>
                    {loading ? 'Sending OTP...' : 'Send Verification Code'}
                  </button>
                </div>
              </form>
            </>
          ) : (
            // OTP Verification Form
            <>
              <h2>Verify Your Email</h2>
              <div className="otp-info" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Mail size={48} style={{ margin: '0 auto 10px', color: '#007bff' }} />
                <h3>Check your email</h3>
                <p>We've sent a 6-digit verification code to</p>
                <strong>{userEmail}</strong>
              </div>
              
              <form onSubmit={handleVerifyOTP}>
                <div className="auth-form">
                  <label htmlFor="otp">Verification Code</label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={handleOtpChange}
                    maxLength={6}
                    style={{ 
                      textAlign: 'center', 
                      fontSize: '18px', 
                      letterSpacing: '5px',
                      fontWeight: 'bold'
                    }}
                    autoComplete="off"
                  />

                  <button type="submit" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify & Create Account'}
                  </button>

                  <div className="otp-actions" style={{ textAlign: 'center', marginTop: '15px' }}>
                    {resendTimer > 0 ? (
                      <p style={{ color: '#666', fontSize: '14px' }}>
                        <Clock size={16} style={{ display: 'inline', marginRight: '5px' }} />
                        Resend code in {resendTimer}s
                      </p>
                    ) : (
                      <button 
                        type="button" 
                        onClick={handleResendOTP}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: '#007bff', 
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          fontSize: '14px'
                        }}
                        disabled={loading}
                      >
                        Resend verification code
                      </button>
                    )}
                  </div>

                  <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <button 
                      type="button" 
                      onClick={handleBackToForm}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#666', 
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      ← Back to registration
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}

          <p>Already Registered? <Link to="/login">Sign In</Link></p>
        </div>
        
        <div className="register-imageArea"></div>
      </div>
      
      {loading && (
        <div className='overlay-loader'>
          <ScaleLoader color='#000000' size={25} />
        </div>
      )}
    </div>
  );
};

export default RegisterForm;