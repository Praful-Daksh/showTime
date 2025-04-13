import React, { useState } from 'react';
import '../styles/Login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div className="container">
            <div className="form-area">
                <h2>Are you a Host..?</h2>
                <h3>Enter your credentials to prove that.</h3>
                <form action="/login/verify" method="POST">
                    <div className="form">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <div className="show-password">
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

                <p>Not Registered? <a href="/login/register">Sign up</a></p>
            </div>
            <div className="image-area"></div>
        </div>
    );
};

export default Login;
