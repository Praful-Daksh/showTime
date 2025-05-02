import React, { useState } from 'react';
import Avatar from 'react-avatar'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners'

const UserProfile = () => {
    const navigate = useNavigate();
    const [showSettings, setShowSettings] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);


    const user = {
        name: 'John Doe',
        email: 'john@example.com'
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEvents');
        navigate('/login');
        toast.success('Logged out successfully', { position: 'top-center' });
    };

    return (
        <div className="max-w-sm mx-auto mt-12 p-6 bg-white rounded-lg shadow-md space-y-6">
            <div className="flex items-center space-x-4">
                <Avatar name={user.name} size='50px' />
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                    <p className="text-gray-500">{user.email}</p>
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
                                value={user.name}
                                // onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                type="text"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">New Password</label>
                            <input
                                name="email"
                                value={user.email}
                                // onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                type="email"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm New  Password</label>
                            <input
                                name="email"
                                value={user.email}
                                // onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                type="email"
                            />
                        </div>
                        <button className='bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700'>
                            Change Password
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
    );
}

export default UserProfile;