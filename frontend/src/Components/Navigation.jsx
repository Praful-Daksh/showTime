import React from 'react';
import { Link } from 'react-router-dom'
import { HouseIcon, UserCog, Plus, Ticket, WalletCards, Compass } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Navigation = () => {
  const navigate = useNavigate()
  const goToExplore = () => {
    navigate('/explore/events', { state: { isAuth: true } })
  }


  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-black-200 navigation-button-container">
      <div className="container mx-auto px-4">
        <div className="flex justify-around py-3">
          <Link to={'/dashboard/home'} className='flex flex-col items-center text-black-500 hover:text-blue-500'>
            <HouseIcon size={25} className='fas fa-user text-xl' />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link to={'/dashboard/newEvent'} className='flex flex-col items-center text-black-500 hover:text-blue-500'>
            <Plus size={25} className='fas fa-user text-xl' />
            <span className="text-xs mt-1">Create</span>
          </Link>

          <Link to={'/dashboard/allEvents'} className='flex flex-col items-center text-black-500 hover:text-blue-500'>
            <WalletCards size={25} className='fas fa-user text-xl' />
            <span className="text-xs mt-1">All Events</span>
          </Link>

          <Link to={'/dashboard/Publish'} className='flex flex-col items-center text-black-500 hover:text-blue-500'>
            <Ticket size={25} className='fas fa-user text-xl' />
            <span className="text-xs mt-1">Tickets</span>
          </Link>
          <button className='flex flex-col items-center text-black-500 hover:text-blue-500 ' onClick={goToExplore} >
            <Compass size={25} className='fas fa-user text-xl' />
            <span className="text-xs mt-1">Explore</span>
          </button>

          <Link to={'/dashboard/user/profile'} className='flex flex-col items-center text-black-500 hover:text-blue-500'>
            <UserCog size={25} className='fas fa-user text-xl' />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}




export default Navigation;
