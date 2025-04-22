import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import Header from '../Components/Header';
import { ScaleLoader } from 'react-spinners'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const [userEdata, setuserEdata] = useState([])
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      setLoading(true);
      const url = 'https://backshow.onrender.com/dashboard/home'
      const url2 = 'http://localhost:5000/dashboard/home'
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Authorization': localStorage.getItem('authToken')
        }
      });
      const data = await response.json();
      setLoading(false);
      if (data.success) {
        setuserEdata(data.upcomingEvents);
      } else {
        toast.error(data.message || 'Login failed. Please try again.', { position: 'top-center' })
        setuserEdata([]);
        navigate('/login')
      }
    } catch (err) {
      setLoading(false);
      toast.error('Something went wrong, Try again later', { position: 'top-right' })
    }
  }
  useEffect(() => {
    fetchData();
  }, [])




  return (
    <div className='dash-wrapper'>
      <Header />
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="flex-1 p-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
              <div className="bg-white shadow-sm rounded-lg border">
                <div className="p-4 text-center">
                  <h3 className="text-2xl font-semibold">10</h3>
                  <p className="text-gray-600">Events</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
              <div className="bg-white shadow-sm rounded-lg border">
                <div className="p-4 text-center">
                  <h3 className="text-2xl font-semibold">0</h3>
                  <p className="text-gray-600">Tickets Sold</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
              <div className="bg-white shadow-sm rounded-lg border">
                <div className="p-4 text-center">
                  <h3 className="text-2xl font-semibold">$0</h3>
                  <p className="text-gray-600">Total Revenue</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
              <div className="bg-white shadow-sm rounded-lg border">
                <div className="p-4 text-center">
                  <h3 className="text-2xl font-semibold">$0</h3>
                  <p className="text-gray-600">Total Revenue</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg mt-4 border">
            <div className="border-b px-4 py-2 font-semibold text-gray-700">
              Upcoming Events
            </div>
            <div className="p-4 space-y-2 max-h-[300px] overflow-y-auto">
              {userEdata.length > 0 ? (
                userEdata.map((event, index) => (
                  <div key={index} className="bg-white shadow-sm rounded-md border p-4">
                    <div className="text-m font-semibold">{event.title}</div>
                    <div className="text-sm text-gray-500">{new Date(event.date).toDateString()} </div>
                  </div>
                ))
              ) : (
                <div>No upcoming events</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Navigation />
      {
        loading ?
          <div className='overlay-loader'><ScaleLoader color='#000000' size={50} /></div>
          : null
      }
    </div>
  );
};

export default Dashboard;
