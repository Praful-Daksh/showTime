import React, { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const DashEvent = () => {
  const params = useParams();
  const eventId = params.eventId;
  const navigate = useNavigate();

  const allEventDetails = JSON.parse(localStorage.getItem('userEvents')) || [];
  const eventDetails = allEventDetails.find(event => event._id === eventId);

  const [eventData, setEventData] = useState({
    title: eventDetails?.title || '',
    description: eventDetails?.description || '',
    venue: eventDetails?.venue || '',
    city: eventDetails?.city || '',
    access: eventDetails?.access || 'Public',
    date: eventDetails?.date || '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const updateEvent = async (e) => {
    e.preventDefault();
    console.log(eventData)
    try {
      setLoading(true)
      const url = `https://backshow.onrender.com/dashboard/allEvents/${eventId}`
      const url2 = `http://localhost:5000/dashboard/allEvents/${eventId}`
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('authToken')
        },
        body: JSON.stringify(eventData)
      })
      const data = await response.json()
      setLoading(false)
      if (data.success) {
        toast.success(data.message, { position: 'top-center' })
      } else {
        toast.error(data.message, { position: 'top-center' })
      }
      navigate('/dashboard/home')
    } catch (err) {
        console.log(err);
        toast.error("Catch block Error", { position: 'top-center' })
    }
  };

  const deleteEvent = async () => {
    try {
      setLoading(true)
      const url = `https://backshow.onrender.com/dashboard/allEvents/delete/${eventId}`
      const url2 = `http://localhost:5000/dashboard/allEvents/delete/${eventId}`
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          'Authorization': localStorage.getItem('authToken')
        }
      });
      const data = await response.json();
      setLoading(false);
      if (data.success) {
        toast.success(data.message, { position: 'top-center' });
        navigate('/dashboard/home');
      } else {
        toast.error(data.message, { position: 'top-center' });
      }
    } catch (err) {
      console.log(err);
      toast.error("Error deleting event", { position: 'top-center' });
    }
  };

  const Authenticate = () => {
    const isLoggedIn = localStorage.getItem('authToken');
    if (!isLoggedIn) {
      navigate('/login');
      toast.error('You are not Logged In', { position: 'top-center' })
    }
  }

  useEffect(() => {
    Authenticate();
  }, [])

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen p-6 gap-6">
        <div className="w-full md:w-1/3 flex items-center order-2 md:order-1">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">🎟️ Publish Tickets</h3>
            <p className="text-sm text-gray-600 mb-4">Set up ticket types, pricing, and availability for this event.</p>
            <button
              onClick={() => navigate(`/dashboard/tickets/${eventId}`)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
              Publish Tickets
            </button>

            <div className="bg-red-100 mt-5 rounded-xl shadow-lg p-6 w-full mt-6">
              <h3 className="text-xl font-semibold text-red-800 mb-2">🚨 Danger Zone</h3>
              <p className="text-sm text-gray-600 mb-4">If you delete this event, it will be permanently removed from the system. This action cannot be undone.</p>
              <button
                onClick={deleteEvent}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-8 w-full md:w-2/3 order-1 md:order-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Event Details</h2>
          <p className="text-gray-600 mb-6">Modify event information. Date can't be changed.</p>

          <form className="space-y-6" onSubmit={updateEvent}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Name</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
                rows="4"
                name="description"
                value={eventData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Venue</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
                name="venue"
                value={eventData.venue}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
                name="city"
                value={eventData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
                name="access"
                value={eventData.access}
                onChange={handleChange}
                required
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                value={new Date(eventData.date).toLocaleString()}
                readOnly
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:opacity-90 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <ScaleLoader color="#2563EB" />
        </div>
      )}
    </>
  );
};

export default DashEvent;
