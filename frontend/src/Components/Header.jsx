import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import {Link} from 'react-router-dom'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dash-head-wrap">
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
          <div className="absolute right-4 top-16 w-40 bg-white text-black rounded shadow-md z-50">
            <ul className="flex flex-col py-2">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link>Home</Link></li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link>All Events</Link></li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link>Create Event</Link></li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link>Publish</Link></li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link>Profile</Link></li>
            </ul>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
