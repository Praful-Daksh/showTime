import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../Partials/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const authenticate = async () => {
            try {
                const response = await fetch(`${api.production}/dashboard/`, {
                    method: "GET",
                    headers: {
                        'Authorization': localStorage.getItem('authToken')
                    }
                });
                const data = await response.json();
                setLoading(false);
                if (data.success) {
                    setIsLogged(true);
                } else {
                    handleLogout();
                }
            } catch (err) {
                setLoading(false);
                handleLogout();
            }
        };

        authenticate();

    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEvents');
        localStorage.removeItem('user');
        setIsLogged(false);
        toast.warn('Login to Continue.', { position: 'top-center' });
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isLogged, loading, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
