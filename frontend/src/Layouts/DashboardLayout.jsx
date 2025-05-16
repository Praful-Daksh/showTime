import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import Navigation from '../Components/Navigation';
import { useAuth } from '../Partials/AuthContext'; 
import { HashLoader } from 'react-spinners';

const DashboardLayout = () => {
    const { isLogged, loading } = useAuth();

    if (loading) {
        return (
            <div className='overlay-loader'>
                <HashLoader color='#000000' size={50} />
            </div>
        );
    }

    return (
        isLogged && (
            <div className='dash-wrapper'>
                <Header />
                <Navigation />
                <Outlet />
            </div>
        )
    );
};

export default DashboardLayout;
