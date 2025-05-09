import React, { useState } from 'react'
import showImages from '../Assets/showImages';


const Show = ({ show }) => {
    let description = show.description;
    const [showDescription, setShowDescription] = useState(false);
    if (!showDescription) {
        if (description.length > 60)
            description = description.substring(0, 60) + '....';
    }

    return (
        <>
            <div
                key={show._id}
                className="event-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg border border-gray-100"
            >
                <div className="h-48 overflow-hidden relative">
                    <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                        {show.category}
                    </span>
                    <img
                        src={showImages[show.category]}
                        alt={show.ticketName}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-medium mb-1">{show.ticketName}</h3>
                    <div className="text-gray-600 text-sm mb-2">
                        <div className="flex items-center mb-1">
                            <i className="fas fa-calendar-alt mr-2"></i>
                            {new Date(show.showDate).toDateString()}
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            {show.showVenue}, {show.showCity}
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                        {description}
                        {show.description.length > 60 ?
                            (<button onClick={() => setShowDescription((prevState) => !prevState)} className="text-indigo-500 hover:text-indigo-600">
                                {showDescription ? 'See Less' : 'See More'}
                            </button>)
                            : null
                        }
                    </p>
                    <div className="flex justify-between items-center">
                        <span className="text-blue-500 font-bold">₹{show.price}</span>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                            Get Tickets
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Show