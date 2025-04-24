import React from "react";

const NewEvent = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Host an Event?</h2>
          <p className="text-gray-600">Fill some details and you will be good to go.</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Name</label>
            <input type="text" placeholder="Enter event name" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea placeholder="Enter event description" className="mt-1 block w-full border border-gray-300 rounded-md p-2" rows="3" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input type="time" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" placeholder="Enter location" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Select category</option>
              <option>Conference</option>
              <option>Workshop</option>
              <option>Webinar</option>
              <option>Meetup</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default NewEvent; 
