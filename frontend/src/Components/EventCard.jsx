const EventCard = ({ event }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
          <p className="text-gray-600 mb-2">{event.date} • {event.time}</p>
          <p className="text-gray-600 mb-3">{event.location}</p>
          <p className="mb-4">{event.description}</p>
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">{event.price}</span>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Details</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Tickets</button>
            </div>
          </div>
        </div>
      </div>
    );
  };