import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserProfile = () => {
    const navigate = useNavigate();
    const logoutUser = async () => {
        localStorage.removeItem('authToken');
        navigate('/login');
        toast.success('Succesfully Logged Out !',{position:'top-center'})
    }
    useEffect(() => {
        logoutUser();
    }, []);

    return (
        <div>UserProfile</div>
    )
}

export default UserProfile