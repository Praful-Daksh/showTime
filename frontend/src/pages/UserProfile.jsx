import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners'

const UserProfile = () => {
    const navigate = useNavigate();
    const [showSettings, setShowSettings] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const url = 'https://backshow.onrender.com';
    const url2 = process.env.REACT_APP_localUrl;

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }
    const handlePasswordChange = (e) => {
        if (e.target.name === 'new-password') {
            setNewPassword(e.target.value);
        } else if (e.target.name === 'confirm-password') {
            setConfirmPassword(e.target.value);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEvents');
        navigate('/login');
        toast.success('Logged out successfully', { position: 'top-center' });
    };

    const handleUpdate = async () => {
        if (newPassword !== '') {
            if (newPassword.length < 8) {
                toast.error('Password must be at least 8 characters long', { position: 'top-center' });
                return;
            }
            else if (newPassword !== confirmPassword) {
                toast.error('Passwords do not match', { position: 'top-center' });
                return;
            }
        }
        try {
            setLoading(true);
            const response = await fetch(`${url}/auth/updateUser`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    name: userData.name,
                    password: newPassword
                })
            });
            const data = await response.json();
            setLoading(false);
            if (data.success) {
                toast.success('Profile updated successfully', { position: 'top-center' });
                setUserData(data.user);
            } else {
                toast.error(data.message, { position: 'top-center' });
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
            toast.error('Failed to update profile, Try again later', { position: 'top-center' });
        }
        setNewPassword('');
        setConfirmPassword('');
    };


    useEffect(() => {
        setLoading(true)
        const token = localStorage.getItem('authToken')
        if (!token) {
            setLoading(false)
            navigate('/login')
            toast.error('Please login to access this page', { position: 'top-center' })
            return
        }
        const fetchUserData = async () => {
            if (localStorage.getItem('user')) {
                setUserData(JSON.parse(localStorage.getItem('user')))
                setLoading(false)
                return;
            }
            else {
                try {
                    const response = await fetch(`${url2}/auth/getUserData`, {
                        method: "GET",
                        headers: {
                            'Authorization': token
                        }
                    });
                    const data = await response.json();
                    setLoading(false);
                    if (data.success) {
                        setUserData(data.user);
                        localStorage.setItem('user', JSON.stringify(data.user))
                    } else {
                        toast.error(data.message, { position: 'top-center' })
                    }
                } catch (error) {
                    setLoading(false);
                    toast.error('Failed to Fetch user data, Try again later', { position: 'top-center' })
                    navigate('/dashboard/home')
                }
            }
        };
        fetchUserData();
    }, [])




    return (
        <>
            <div className="max-w-sm mx-auto mt-12 p-6 bg-white rounded-lg shadow-md space-y-6">
                <div className="flex items-center space-x-4">
                    <Avatar
                        sx={{ width: 50, height: 50, bgcolor: '#0078d4' }}
                    >
                        {userData?.name ? userData.name.charAt(0).toUpperCase() : ''}
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">{userData?.name}</h2>
                        <p className="text-gray-500">{userData?.email}</p>
                    </div>
                </div>

                <div className="space-y-3 pt-4">
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="w-full text-left px-4 py-3 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-800"
                    >
                        ⚙️ Settings
                    </button>

                    {showSettings && (
                        <div className="px-4 py-3 bg-gray-50 border rounded-md shadow-inner space-y-1">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    name="name"
                                    value={userData?.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                    type="text"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">New Password</label>
                                <input
                                    name="new-password"
                                    value={newPassword}
                                    onChange={handlePasswordChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                    type="password"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirm New  Password</label>
                                <input
                                    name="confirm-password"
                                    onChange={handlePasswordChange}
                                    value={confirmPassword}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                    type="password"
                                />
                            </div>
                            <button className='bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700' onClick={handleUpdate}>
                                Update
                            </button>

                        </div>
                    )}

                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 bg-gray-100 rounded-md hover:bg-gray-200 text-red-600"
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>
            {
                loading ?
                    <div className='overlay-loader'><HashLoader color='#000000' size={25} /></div>
                    : null
            }
        </>
    );
}

export default UserProfile;