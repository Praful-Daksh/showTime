import React, { useState , useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from '../Partials/api';

const NewEvent = () => {
  const navigate = useNavigate()
  const [time, setTime] = useState('');
  const [day, setDay] = useState('');
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    venue: '',
    city: '',
    access: '',
    category: ''
  });
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const url = api.production;
  const Authenticate = async () => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login');
      toast.error('You are not Logged In', { position: 'top-center' })
    }
  }
  useEffect(() => {
    Authenticate();
  }, [])

  const recordEvent = async (e) => {
    e.preventDefault();
    const combinedDateTime = new Date(`${day}T${time}:00`);
    const finalEventData = {
      ...eventData,
      date: combinedDateTime
    };
    const eventDate = new Date(combinedDateTime);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (eventDate < today) {
      toast.error('Event date cannot be in the past', { position: 'top-center' })
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`${url}/dashboard/newEvent`, {
        method: "POST",
        headers: {
          'Authorization': localStorage.getItem('authToken'),
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify(finalEventData)
      })
      const data = await response.json()
      setLoading(false)
      if (data.success) {
        toast.success('Event Creation Successfull !', { position: 'top-center' })
        setTimeout(() => {
          navigate('/dashboard/home')
        }, 1000)
      } else {
        toast.error(data.message, { position: 'top-center' })
      }
    }
    catch (err) {
      setLoading(false);
      toast.error('Something went wrong, Try again later', { position: 'top-right' })
      navigate('/dashboard/home')
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 border">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Host an Event?</h2>
            <p className="text-gray-600">Fill some details and you will be good to go.</p>
          </div>

          <form className="space-y-4" onSubmit={recordEvent}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Name</label>
              <input
                type="text"
                placeholder="Enter event name"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                placeholder="Enter event description"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                rows="3"
                name="description"
                value={eventData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Venue</label>
              <input
                type="text"
                placeholder="Enter location"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
                placeholder="Enter city"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                name="city"
                value={eventData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                type="text"
                placeholder="Enter Category"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                name="category"
                value={eventData.category}
                onChange={handleChange}
                required>
                <option value="Music">Music</option>
                <option value="Sports">Sports</option>
                <option value="Arts">Arts</option>
                <option value="Food">Food</option>
                <option value="Technology">Technology</option>
                <option value="Theater">Theater</option>
                <option value="Comedy">Comedy</option>
                <option value="Festival">Festival</option>
                <option value="Conference">Conference</option>
                <option value="Workshop">Workshop</option>
                <option value="Exhibition">Exhibition</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Event Type</label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                name="access"
                value={eventData.access}
                onChange={handleChange}
                required
              >
                <option value={'Private'}>Private</option>
                <option value={'Public'}>Public</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
      {
        loading ?
          <div className='overlay-loader'><ScaleLoader color='#000000' size={25} /></div>
          : null
      }
    </>
  );
};

export default NewEvent;
