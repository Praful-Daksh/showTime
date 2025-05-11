import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Navigation from '../Components/Navigation';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import ShowCard from '../Components/Show';
import api from '../Partials/api';

const ExploreEvents = () => {
  const location = useLocation();
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const isAuth = location.state?.isAuth || false;
  const url = api.production;


  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${url}/Tickets/allTickets`, {
          method: 'GET',
        });
        const data = await response.json();
        setLoading(false);
        if (data.success) {
          setShows(data.Tickets);
        } else {
          toast.error('No shows found', { position: 'top-right' });
        }
      } catch (err) {
        setLoading(false);
        toast.error('Something went wrong', { position: 'top-right' });
        console.log(err);
      }
    };
    fetchShows();
  }, []);

  const filteredShows = shows.filter((show) => {
    const matchesSearch =
      show.ticketName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      show.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      show.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      show.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
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
              {[
                'All',
                'Music',
                'Sports',
                'Arts',
                'Food',
                'Technology',
                'Theater',
                'Comedy',
                'Festival',
                'Conference',
                'Workshop',
                'Exhibtion',
                'Other',
              ].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Explore</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShows.length > 0 ? (
                filteredShows.map((show) => (
                  <ShowCard show={show} key={show._id} />
                ))
              ) : (
                <div className="flex justify-center items-center h-48 bg-gray-100 rounded-lg shadow-md">
                  <p className="text-gray-500">No events found</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {isAuth && <Navigation />}

      {loading && (
        <div className="overlay-loader">
          <HashLoader color="#000000" size={25} />
        </div>
      )}
    </>
  );
};

export default ExploreEvents;
