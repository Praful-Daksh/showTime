import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Navigation from '../Components/Navigation'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
const DashboardLayout = () => {
    const navigate = useNavigate();
    const Authenticate = async () => {
        const isLoggedIn = localStorage.getItem('authToken');
        if (!isLoggedIn) {
            navigate('/login');
            toast.error('You are not Logged In', { position: 'top-center' })
        }
    }
    useEffect(() => {
        Authenticate();
    },[])
    return (
        <div className='dash-wrapper'>
            <Header />
            <Navigation />
            <Outlet />
        </div>
    );
};

export default DashboardLayout;
