import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { ScaleLoader } from 'react-spinners'

const Login = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };
    const handlePasswordToggle = () => {
        setShowPassword(prev => !prev);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loginData.email === '' || loginData.password === '') {
            toast.error('Please Fill both fields !');
        } else {
            try {
                setLoading(true)
                const url = 'https://backshow.onrender.com/auth/login'
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                })
                const data = await response.json()
                setLoading(false)
                if (data.sucess) {
                    toast.success('Login Successfull !', { position: 'top-center' })
                    setTimeout(() => {
                        navigate('/dashboard')
                    }, 1000)
                } else {
                    toast.error(data.message, { position: 'top-center' })
                }
            } catch (error) {
                console.log(error);
            }
        }
    };


    return (
        <div className='bodyWrap'>
            <ToastContainer />
            <div className="auth-container login-container">
                <div className="auth-formArea">
                    <h2>Are you a Host..?</h2>
                    <h3>Enter your credentials to prove that.</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="auth-form">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={loginData.email}
                                onChange={handleChange}
                            />

                            <label htmlFor="password">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={loginData.password}
                                onChange={handleChange}
                            />

                            <div className="auth-showPassword">
                                <input
                                    type="checkbox"
                                    id="showPassword"
                                    checked={showPassword}
                                    onChange={handlePasswordToggle}
                                />
                                <label htmlFor="showPassword">Show Password</label>
                            </div>

                            <button type="submit">Sign In</button>
                        </div>
                    </form>

                    <p>Not Registered? <a href="/register">Sign up</a></p>
                </div>

                <div className="login-imageArea">
                </div>
            </div>

            {
                loading ?
                    <div className='overlay-loader'><ScaleLoader color='#000000' size={50} /></div>
                    : null
            }
        </div>
    );
};

export default Login;
