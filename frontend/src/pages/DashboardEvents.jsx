import React, { useState, useEffect } from 'react';
import Card from '../Components/Card';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DashboardEvents = () => {
    const navigate = useNavigate()
    const [events, setEvents] = useState(null)
    const Authenticate = async () => {
        const isLoggedIn = localStorage.getItem('authToken');
        if (!isLoggedIn) {
            navigate('/login');
            toast.error('You are not Logged In', { position: 'top-center' })
        } else {
            setEvents(JSON.parse(localStorage.getItem('userEvents')));
        }
    }
    useEffect(() => {
        Authenticate();
    }, [])


    return (
        <>
            <div className="p-4 ">
                {(events != null) ? (
                    (events.length > 0) ?
                        (<div className="flex flex-wrap gap-6 justify-center">
                            {events.map(event => (
                                <Card key={event._id} event={event} />
                            ))}
                        </div>) :
                        <div className="text-center text-gray-600">No events found</div>
                ) :
                    <div className="text-center text-gray-600">No events found</div>
                }
            </div>
        </>
    );
};

export default DashboardEvents;
