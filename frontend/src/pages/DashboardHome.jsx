import React, { useState, useEffect } from 'react';
import { HashLoader } from 'react-spinners'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../Partials/api';

const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const [userEdata, setuserEdata] = useState([])
  const [eventCount, setEventCount] = useState(0);
  const navigate = useNavigate();
    const url = api.production;
    
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/dashboard/home`, {
        method: "GET",
        headers: {
          'Authorization': localStorage.getItem('authToken')
        }
      });
      const data = await response.json();
      setLoading(false);
      if (data.success) {
        setuserEdata(data.upcomingEvents.filter(event => {
          const eventDate = new Date(event.date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return eventDate >= today;
        }))
        setEventCount(data.upcomingEvents.length);
        localStorage.setItem('userEvents', JSON.stringify(data.upcomingEvents))
      } else {
        localStorage.removeItem('authToken')
        localStorage.removeItem('userEvents')
        localStorage.removeItem('user')
        toast.warn('Login To Continue', { position: 'top-center' })
        setuserEdata([]);
        setEventCount(0);
        navigate('/login')
      }
    } catch (err) {
      setLoading(false);
      localStorage.removeItem('authToken')
      localStorage.removeItem('userEvents')
      localStorage.removeItem('user')
      toast.error('Something went wrong, Try again later', { position: 'top-right' })
      navigate('/login')
    }
  }
  useEffect(() => {
    fetchData();
  }, [])




  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="flex-1 p-4 mx-auto max-w-7xl w-full">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
              <div className="bg-white shadow-sm rounded-lg border">
                <div className="p-3 text-center">
                  <h3 className="text-2xl font-semibold">{eventCount}</h3>
                  <p className="text-gray-600 text-sm">Events</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
              <div className="bg-white shadow-sm rounded-lg border">
                <div className="p-3 text-center">
                  <h3 className="text-2xl font-semibold">0</h3>
                  <p className="text-gray-600 text-sm">Tickets Sold</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
              <div className="bg-white shadow-sm rounded-lg border">
                <div className="p-3 text-center">
                  <h3 className="text-2xl font-semibold">$0</h3>
                  <p className="text-gray-600 text-sm">Total Revenue (VIP)</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
              <div className="bg-white shadow-sm rounded-lg border">
                <div className="p-3 text-center">
                  <h3 className="text-2xl font-semibold">$0</h3>
                  <p className="text-gray-600 text-sm">Total Revenue (Standarad)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg mt-4 border">
            <div className="border-b px-4 py-2 font-semibold text-gray-700 flex items-center justify-between">
              Upcoming Events
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{userEdata.length}</span>
            </div>
            <div className="p-3 space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin">
              {userEdata.length > 0 ? (
                userEdata.map(event => (
                  <div
                    key={event._id}
                    className="bg-white shadow-sm rounded-md border p-3 cursor-pointer hover:bg-gray-50"
                    onClick={() => navigate(`/dashboard/allEvents/${event._id}`)}
                  >
                    <div className="text-m font-semibold">{event.title}</div>
                    <div className="text-sm text-gray-500">{new Date(event.date).toDateString()}</div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-2">No upcoming events</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {
        loading ?
          <div className='overlay-loader'>
            <HashLoader color='#000000' size={25} />
          </div>
          : null
      }
    </>


  );
};

export default Dashboard;
