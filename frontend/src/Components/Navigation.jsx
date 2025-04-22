import React from 'react';
import { Link } from 'react-router-dom'
import { HouseIcon, UserRound, Plus, Ticket, WalletCards } from 'lucide-react'

const Sidebar = () => {
  return (
    <div className="navigation-button-container">
      <Link to={'/dashboard/home'}>
        <button className="navigation-button">
          <HouseIcon size={20} />
        </button>
      </Link>

     <Link to={'/dashboard/newEvent'}>
        <button className="navigation-button">
          <Plus size={20} />
        </button>
      </Link>

      <Link to={'/dashboard/Events'}>
        <button className="navigation-button">
          <WalletCards size={20} />
        </button>
      </Link>
      <Link to={'/dashboard/Publish'}>
        <button className="navigation-button">
          <Ticket size={20} />
        </button>
      </Link>
      <Link to={'/dashboard/user/profile'}>
        <button className="navigation-button">
          <UserRound size={20} />
        </button>
      </Link>
    </div >
  );
}




export default Sidebar;
