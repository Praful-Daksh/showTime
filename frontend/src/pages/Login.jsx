import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { HashLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import api from '../Partials/api';
import {ArrowLeft} from 'lucide-react'

const Login = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const url = api.production;

    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };
    // show password toggle
    const handlePasswordToggle = () => {
        setShowPassword(prev => !prev);
    };
    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loginData.email === '' || loginData.password === '') {
            toast.warn('Please Fill both fields !');
        } else {
            try {
                setLoading(true)
                const response = await fetch(`${url}/auth/login`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                })
                const data = await response.json()
                setLoading(false)
                if (data.success) {
                    localStorage.setItem('authToken', data.token)
                    const user = {
                        name: data.name,
                        email: data.email,
                        revenueClassic : data.revenueClassic,
                        revenueVip : data.revenueVip,
                        ticketSold : data.ticketSold
                    }
                    localStorage.setItem('user', JSON.stringify(user))
                    toast.success('Login Successfull !', { position: 'top-center' })
                    setTimeout(() => {
                        navigate('/dashboard/home')
                    }, 1000)
                } else {
                    toast.error(data.message, { position: 'top-center' })
                }
            } catch (error) {
                setLoading(false)
                toast.error('Something went wrong, Try again later', { position: 'top-right' })
                navigate('/login')
            }
        }
    };


    return (
        <div className='bodyWrap'>
            <div className="auth-container login-container relative">
                <span className="absolute top-2 right-2 bg-transparent text-black px-2 py-1 rounded-md text-xs font-medium cursor-pointer">
                    <ArrowLeft className='inline' onClick={() => navigate('/')} /> 
                </span>
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

                    <p>Not Registered? <Link to={'/register'}>Register</Link></p>
                </div>

                <div className="login-imageArea">
                </div>
            </div>

            {
                loading ?
                    <div className='overlay-loader'><HashLoader color='#000000' size={25} /></div>
                    : null
            }
        </div>
    );
};

export default Login;
