import { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';

const Marketing = () => {
    const [events, setEvents] = useState(null)
    useEffect(() => {
        if (localStorage.getItem('userEvents')) {
            setEvents(JSON.parse(localStorage.getItem('userEvents')));
        }
    }, []);
    return (
        <>
            <div className="p-4 ">
                {(events != null) && (
                    (events.length > 0) ?
                        (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map(event => event.publish && (
                                <div
                                    key={event._id}
                                    className="event-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg border border-gray-100"
                                >
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
                                                Stats
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
    )
}

export default Marketing