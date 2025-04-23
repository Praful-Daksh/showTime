import React from 'react';

const Card = ({ event }) => {
  const { title, venue, date } = event;

  return (
    <div className="w-full sm:w-[300px] bg-white rounded-xl shadow-md overflow-hidden p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-gray-600 text-sm">{venue}</p>
      <p className="mt-2 text-gray-600 text-sm">{new Date(date).toDateString()}</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
        Manage
      </button>
    </div>
  );
};

export default Card;
