import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Navigation from '../Components/Navigation'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const DashboardLayout = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const Authenticate = async () => {
        if (!localStorage.getItem('authToken')) {
            navigate('/login');
            toast.error('Login to Continue.', { position: 'top-center' })
            setLoggedIn(false)
        } else {
            setLoggedIn(true);
        }
    }
    useEffect(() => {
        Authenticate();
    }, [])
    return (
        isLoggedIn && (
            <div className='dash-wrapper'>
                <Header />
                <Navigation />
                <Outlet />
            </div>
        )
    );
};

export default DashboardLayout;