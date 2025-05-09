import React, { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
    category: eventDetails?.category || ''
  });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Track auth status

  const url = 'https://backshow.onrender.com';
  const url2 = process.env.REACT_APP_localUrl;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };



  const showConfirmAlert = () => {
    withReactContent(swal).fire({
      title: 'Are you sure to delete This Event?',
      text: "All tasks and published tickets of this event will be deleted too.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'I am Sure!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEvent()
      }
    }
    )
  }



  const updateEvent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${url}/dashboard/allEvents/update/${eventId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('authToken')
        },
        body: JSON.stringify(eventData)
      });
      const data = await response.json();
      setLoading(false);
      if (data.success) {
        toast.success(data.message, { position: 'top-center' });
      } else {
        toast.error(data.message, { position: 'top-center' });
      }
      navigate('/dashboard/home');
    } catch (err) {
      console.log(err);
      toast.error("Catch block Error", { position: 'top-center' });
    }
  };

  const deleteEvent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/dashboard/allEvents/delete/${eventId}`, {
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

  const Authenticate = async () => {
    const isLoggedIn = localStorage.getItem('authToken');
    if (!isLoggedIn) {
      navigate('/login');
      toast.error('You are not Logged In', { position: 'top-center' });
    } else {
      try {
        setLoading(true);
        const response = await fetch(`${url}/dashboard/allEvents/verify/${eventId}`, {
          method: "GET",
          headers: {
            'Authorization': localStorage.getItem('authToken')
          }
        });
        const data = await response.json()
        if (data.success) {
          setIsAuthenticated(true);
          try {
            const response = await fetch(`${url}/dashboard/allEvents/tasks/${eventId}`, {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('authToken')
              }
            });
            const data = await response.json()
            setLoading(false)
            if (data.success) {
              setTasks(data.tasks);
            } else {
              toast.error(data.message, { position: 'top-center' });
              setTasks([]);
            }
          } catch (err) {
            setLoading(false);
            toast.error("internal server error", { position: 'top-center' });
            setTasks([]);
          }
        } else {
          setLoading(false);
          navigate('/dashboard/home');
          toast.error('Url Error', { position: 'top-center' });
        }
      } catch (err) {
        setLoading(false);
        toast.error("Internal server error", { position: 'top-center' });
      }
    }
  };

  useEffect(() => {
    Authenticate();
  }, []);

  const addTask = async () => {
    if (newTask !== '')
      try {
        setLoading(true)
        const response = await fetch(`${url}/dashboard/allEvents/tasks/add/${eventId}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('authToken')
          },
          body: JSON.stringify({ newTask })
        });
        const data = await response.json()
        setLoading(false)
        if (data.success) {
          toast.success(data.message, { position: 'top-left' });
        }
      } catch (err) {
        setLoading(false);
        toast.error("internal server error", { position: 'top-center' });
        navigate(`/dashboard/allEvents/${eventId}`)
      }
  };

  const removeTask = async (taskId) => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/dashboard/allEvents/tasks/delete/${eventId}`, {
        method: "DELETE",
        headers: {
          'Authorization': localStorage.getItem('authToken')
        }
      });
      const data = await response.json();
      setLoading(false);
      if (data.success) {
        toast.success(data.message, { position: 'top-center' });
      } else {
        toast.error(data.message, { position: 'top-center' });
      }
      Authenticate();
    } catch (err) {
      console.log(err);
      toast.error("Error Removing task", { position: 'top-center' });
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen p-6 gap-6">
        <div className="w-full md:w-1/3 flex items-center order-2 md:order-1">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full">
            {/* To-Do List Section */}
            <div className="bg-yellow-100 p-4 rounded-xl mb-4">
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">📝 To-Do List</h3>
              <ul className="list-disc pl-5 mb-4">
                {tasks.length > 0 ? (
                  tasks.map((t) => (
                    <li key={t._id} className="flex justify-between items-center">
                      {t.task}
                      <button
                        onClick={() => removeTask(t._id)}
                        className="ml-2 text-red-600"
                      >
                        ❌
                      </button>
                    </li>
                  ))
                ) : (
                  <p>No Tasks</p>
                )}
              </ul>
              <div className="flex items-center">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add new task..."
                />
                <button
                  onClick={addTask}
                  className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Add Task
                </button>
              </div>
            </div>

            {isAuthenticated && !eventDetails.publish && (
              <>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">🎟️ Publish Tickets</h3>
                <p className="text-sm text-gray-600 mb-4">Set up ticket types, pricing, and availability for this event.</p>
                <button
                  onClick={() => navigate(`/dashboard/tickets/publish/${eventId}`)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
                >
                  Publish Tickets
                </button>
                <p>⚠ Once Event is Published you cannot update event details.</p>
              </>
            )}

            <div className="bg-red-100 mt-5 rounded-xl shadow-lg p-6 w-full mt-6">
              <h3 className="text-xl font-semibold text-red-800 mb-2">🚨 Danger Zone</h3>
              <p className="text-sm text-gray-600 mb-4">If you delete this event, it will be permanently removed from the system. This action cannot be undone.</p>
              <button
                onClick={showConfirmAlert}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-8 w-full md:w-2/3 order-1 md:order-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Event Details</h2>
          {eventDetails.publish ?
            <p className="text-yellow-600 mb-6">Event is Published, You can't Change any details below.</p>
            :
            <p className="text-gray-600 mb-6">Modify event information. Date can't be changed.</p>
          }

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
                disabled={eventDetails.publish}
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
                disabled={eventDetails.publish}
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
                disabled={eventDetails.publish}
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
                disabled={eventDetails.publish}
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
                required
                disabled={eventData.category}
              >
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
              <label className="block text-sm font-medium text-gray-700">Evnet Type</label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
                name="access"
                value={eventData.access}
                onChange={handleChange}
                disabled={eventDetails.publish}
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
                disabled={true}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:opacity-90 transition"
              disabled={eventDetails.publish}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>

      {loading && (
        <div className="overlay-loader">
          <ScaleLoader color="#2563EB" size={25}/>
        </div>
      )}
    </>
  );
};

export default DashEvent;
