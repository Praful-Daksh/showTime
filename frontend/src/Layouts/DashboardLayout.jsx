import { Outlet, Link } from 'react-router-dom';
import Header from '../Components/Header';
import Navigation from '../Components/Navigation'
const DashboardLayout = () => {
    return (
        <div className='dash-wrapper'>
            <Header />
            <Navigation />
            <Outlet />
        </div>
    );
};

export default DashboardLayout;
