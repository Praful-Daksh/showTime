import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import showImages from '../Assets/showImages';

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
                {(events != null) && (
                    (events.length > 0) ?
                        (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map(event => (
                                <div
                                    key={event._id}
                                    className="event-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg border border-gray-100"
                                >
                                    <div className="h-48 overflow-hidden relative">
                                        {event.publish ? (
                                            <span className="absolute top-2 left-2 bg-green-700 text-white px-2 py-1 rounded-md text-xs font-medium">
                                                Published
                                            </span>
                                        ) : (<span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                                            Draft
                                        </span>)}
                                        <img
                                            src={showImages[event.category]}
                                            alt={event.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-medium mb-1">{event.title}</h3>
                                        <div className="text-gray-600 text-sm mb-2">
                                            <div className="flex items-center mb-1">
                                                <i className="fas fa-calendar-alt mr-2"></i>
                                                {new Date(event.date).toDateString()}
                                            </div>
                                            <div className="flex items-center">
                                                <i className="fas fa-map-marker-alt mr-2"></i>
                                                {event.venue}, {event.city}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <Link
                                                to={`/dashboard/allEvents/${event._id}`}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                                                Manage
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>) :
                        <div className="text-center text-gray-600">No events found</div>
                )}
            </div >
        </>
    );
};

export default DashboardEvents;
