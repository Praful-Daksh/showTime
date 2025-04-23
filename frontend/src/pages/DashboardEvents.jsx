import React, { useState , useEffect} from 'react';
import Header from '../Components/Header';
import Card from '../Components/Card';
import Navigation from '../Components/Navigation'
import { ScaleLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DashboardEvents = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [events,setEvents] = useState(null)
    const Authenticate = async () => {
        try {
            setLoading(true);
            const url = 'https://backshow.onrender.com/dashboard/home'
            const url2 = 'http://localhost:5000/dashboard/home'
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': localStorage.getItem('authToken')
                }
            });
            const data = await response.json();
            setLoading(false);
            if (!data.success) {
                toast.error(data.message || 'Login failed. Please try again.', { position: 'top-center' })
                navigate('/login')
            }else{
                setEvents(JSON.parse(localStorage.getItem('userEvents')));
            }
        } catch (err) {
            setLoading(false);
            toast.error('Something went wrong, Try again later', { position: 'top-right' })
        }
    }
    useEffect(() => {
        Authenticate();
    }, [])




    return (
        <div className='dash-wrapper'>
            <Header />
            <div className="p-4 ">
                {events ? (
                    <div className="flex flex-wrap gap-6 justify-center">
                        {events.map(event => (
                            <Card key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-600">No events found</div>
                )}
            </div>
            <Navigation />
            {
                loading ?
                    <div className='overlay-loader'><ScaleLoader color='#000000' size={50} /></div>
                    : null
            }
        </div>
    );
};

export default DashboardEvents;
