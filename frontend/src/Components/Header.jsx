import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const goToExplore = () => {
    navigate('/explore/events', { state: { isAuth: true } });
    setIsOpen(false);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dash-head-wrap z-10">
      <header className="flex justify-between items-center px-4 py-3 text-white relative" style={{ backgroundColor: '#3783D7' }}>
        <div className="text-xl font-semibold">SHOWTime</div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label="Toggle Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        {isOpen && (
          <div
            ref={sidebarRef} 
            className="absolute right-4 top-16 w-40 bg-white text-black rounded shadow-md z-50"
          >
            <ul className="flex flex-col py-2">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={closeSidebar}>
                <Link to={'/dashboard/home'}>Home</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={closeSidebar}>
                <Link to={'/dashboard/allEvents'}>All Events</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={closeSidebar}>
                <Link to={'/dashboard/newEvent'}>Create Event</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={closeSidebar}>
                <Link to={'/dashboard/Published'}>Published</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={goToExplore}>
                Explore Events
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={closeSidebar}>
                <Link to={'/dashboard/user/profile'}>Profile</Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
