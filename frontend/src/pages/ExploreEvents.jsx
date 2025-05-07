import React from 'react'
import SearchBar from '../Components/SearchBar'
import Navbar from '../Components/Navbar'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navigation from '../Components/Navigation'
import { HashLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const ExploreEvents = () => {
  const location = useLocation()
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const isAuth = location.state?.isAuth || false
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        title: "Summer Music Festival",
        category: "Music",
        image: "https://cdn1.genspark.ai/user-upload-image/5_generated/58a3fe55-1021-4643-9b4a-742c137431b0_wm",
        date: "Sat Jun 15 2025",
        time: "4:00 PM",
        location: "Central Park",
        price: "$45",
        description: "Join us for a day of amazing music performances featuring top artists and bands."
      },
      {
        id: 2,
        title: "Tech Conference 2025",
        category: "Technology",
        image: "https://cdn1.genspark.ai/user-upload-image/5_generated/58a3fe55-1021-4643-9b4a-742c137431b0_wm",
        date: "Thu Jul 10 2025",
        time: "9:00 AM",
        location: "Convention Center",
        price: "$120",
        description: "Explore the latest innovations in technology with industry leaders and experts."
      },
      {
        id: 3,
        title: "Food & Wine Festival",
        category: "Food",
        image: "https://cdn1.genspark.ai/user-upload-image/5_generated/58a3fe55-1021-4643-9b4a-742c137431b0_wm",
        date: "Sun Jun 22 2025",
        time: "12:00 PM",
        location: "Riverside Park",
        price: "$65",
        description: "Sample delicious food and wine from local restaurants and wineries."
      },
      {
        id: 4,
        title: "Art Exhibition Opening",
        category: "Art",
        image: "https://cdn1.genspark.ai/user-upload-image/5_generated/58a3fe55-1021-4643-9b4a-742c137431b0_wm",
        date: "Fri May 30 2025",
        time: "7:00 PM",
        location: "Metropolitan Gallery",
        price: "$25",
        description: "Be the first to see this extraordinary collection of contemporary art."
      },
      {
        id: 5,
        title: "Broadway Musical",
        category: "Theater",
        image: "https://cdn1.genspark.ai/user-upload-image/5_generated/58a3fe55-1021-4643-9b4a-742c137431b0_wm",
        date: "Sat May 24 2025",
        time: "8:00 PM",
        location: "Lincoln Theater",
        price: "$85",
        description: "Experience the magic of Broadway with this award-winning musical performance."
      },
      {
        id: 6,
        title: "Charity Run",
        category: "Sports",
        image: "https://cdn1.genspark.ai/user-upload-image/5_generated/58a3fe55-1021-4643-9b4a-742c137431b0_wm",
        date: "Sat Jun 7 2025",
        time: "7:30 AM",
        location: "Bayside Park",
        price: "$30",
        description: "Run for a cause in this annual charity event supporting local communities."
      }
    ];

    setEvents(mockEvents);


    // Simulate fetching data from an API
    const fetchShows = async () => {
      try {
        setLoading(true);
        const url = 'https://backshow.onrender.com/Tickets/allTickets'
        const url2 = 'http://localhost:5000/Tickets/allTickets'
        const response = await fetch(url, {
          method: "GET",
        });
        const data = await response.json();
        setLoading(false);
        if(data.success){
          console.log(data.Tickets)
          toast.success('Events fetched successfully', { position: 'top-right' })
        }else{
          toast.error('No shows found', { position: 'top-right' })
        }
      } catch (err) {
        setLoading(false);
        toast.error('Something went wrong', { position: 'top-right' })
        console.log(err);
      }
    }
    fetchShows();


  }, []);

  const filteredEvents = events.filter(event => {
    return event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
  });






  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen" style={{ marginTop: '10vh' }}>
        {/* Search Section */}
        <div className="bg-white shadow-md py-4">
          <div className="container mx-auto px-4">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search events, categories, or keywords"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <main className="flex-grow container mx-auto px-4 py-8">
          {/* Category Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Explore by Category</h2>
            <div className="flex flex-wrap gap-2">
              {['All', 'Music', 'Sports', 'Arts', 'Food', 'Technology', 'Theater' ,'Comedy','Festival','Conference','Workshop','Exhibtion','Other'].map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${category === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/*  Events */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Explore</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <div key={event.id} className="event-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg border border-gray-100">
                  <div className="h-48 overflow-hidden relative">
                    <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                      {event.category}
                    </span>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-1">{event.title}</h3>
                    <div className="text-gray-600 text-sm mb-2">
                      <div className="flex items-center mb-1">
                        <i className="fas fa-calendar-alt mr-2"></i> {event.date} · {event.time}
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-map-marker-alt mr-2"></i> {event.location}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-500 font-bold">{event.price}</span>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                        Get Tickets
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div >
      {isAuth ? (
        <Navigation />
      ) : null}
      {
        loading ?
          <div className='overlay-loader'>
            <HashLoader color='#000000' size={50} />
          </div>
          : null
      }
    </>
  )
}

export default ExploreEvents