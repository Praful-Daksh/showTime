import React from 'react';
import {House,UserRound,Plus,Ticket,WalletCards} from 'lucide-react'

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-center items-center relative transition-all duration-[450ms] ease-in-out w-16">
      <article className="border border-solid border-gray-700 w-full ease-in-out duration-500 left-0 rounded-2xl inline-block shadow-lg shadow-black/15 bg-white">
        <label htmlFor="dashboard" className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl">
          <input className="hidden peer/expand" type="radio" name="path" id="dashboard" />
          <svg className="peer-hover/expand:scale-125 peer-hover/expand:text-blue-400 peer-hover/expand:fill-blue-400 peer-checked/expand:text-blue-400 peer-checked/expand:fill-blue-400 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
            <House/>
          </svg>
        </label>
        <label htmlFor="profile" className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl">
          <input className="hidden peer/expand" type="radio" name="path" id="profile" />
          <svg className="peer-hover/expand:scale-125 peer-hover/expand:text-blue-400 peer-hover/expand:fill-blue-400 peer-checked/expand:text-blue-400 peer-checked/expand:fill-blue-400 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
            <WalletCards/>
          </svg>
        </label>
        <label htmlFor="messages" className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl">
          <input className="hidden peer/expand" type="radio" name="path" id="messages" />
          <svg className="peer-hover/expand:scale-125 peer-hover/expand:text-blue-400 peer-hover/expand:fill-blue-400 peer-checked/expand:text-blue-400 peer-checked/expand:fill-blue-400 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
          <Plus/>
          </svg>
        </label>
        <label htmlFor="help" className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl">
          <input className="hidden peer/expand" type="radio" name="path" id="help" />
          <svg className="peer-hover/expand:scale-125 peer-hover/expand:text-blue-400 peer-hover/expand:fill-blue-400 peer-checked/expand:text-blue-400 peer-checked/expand:fill-blue-400 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
           <Ticket/>
          </svg>
        </label>
        <label htmlFor="settings" className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl">
          <input className="hidden peer/expand" type="radio" name="path" id="settings" />
          <svg className="peer-hover/expand:scale-125 peer-hover/expand:text-blue-400 peer-hover/expand:fill-blue-400 peer-checked/expand:text-blue-400 peer-checked/expand:fill-blue-400 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
            <UserRound/>
          </svg>
        </label>
      </article>
    </div>
  );
}

export default Sidebar;
