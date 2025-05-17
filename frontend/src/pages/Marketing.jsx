    import { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import { toast } from 'react-toastify';
    import HashLoader from 'react-spinners/HashLoader';
    import api from '../Partials/api';
    import { useNavigate } from 'react-router-dom';

    const Marketing = () => {
        const [events, setEvents] = useState(null)
        const [loading, setLoading] = useState(false);
        const navigate = useNavigate();

        const fetchShowDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${api.production}/dashboard/published/events`, {
                    method: 'GET',
                    headers: {
                        'Authorization': localStorage.getItem('authToken')
                    }
                });
                const data = await response.json();
                setLoading(false);
                if (data.success) {
                    setEvents(data.tickets);
                } else {
                    toast.error(data.message, { position: 'top-right' });
                }
            } catch (err) {
                setLoading(false);
                toast.error('Something went wrong', { position: 'top-right' });
                navigate('/dashboard/home');
                console.log(err);
            }
        };
        useEffect(() => {
            fetchShowDetails();
        }, []);

        return (
            <>
                <div className="p-4 ">
                    {(events != null) ? (
                        (events.length > 0) ?
                            (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {events.map(event => (
                                    <div
                                        key={event.id}
                                        className="event-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg border border-gray-100"
                                    >
                                        <div className="p-4">
                                            <h3 className="text-lg font-medium mb-1">{event.showName}</h3>
                                            <div className="text-gray-600 text-sm mb-2">
                                                <div className="flex items-center mb-1">
                                                    <i className="fas fa-calendar-alt mr-2"></i>
                                                    {new Date(event.showDate).toDateString()}
                                                </div>
                                                <div className="flex items-center">
                                                    <i className="fas fa-map-marker-alt mr-2"></i>
                                                    {event.showVenue}, {event.showCity}
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <Link
                                                    to={`/dashboard/Published/${event.id}`}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                                                    Stats
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>) :
                            <div className="text-center text-gray-600">No events found</div>
                    ) : <div className="text-center text-gray-600">Nothing found</div>}
                </div >
                {
                    loading ?
                        <div className='overlay-loader'><HashLoader color='#000000' size={25} /></div>
                        : null
                }
            </>
        )
    }

    export default Marketing