import React from 'react';
import { Frown } from 'lucide-react'; 
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-white">
      <div className="text-center p-6 bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-blur-lg border">
        <Frown size={72} className="mx-auto text-black mb-4" />
        <h1 className="text-4xl font-semibold mb-2 text-black">Oops! Page Not Found</h1>
        <p className="text-lg mb-6 text-black">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          to="/dashboard/home"
          className="inline-block px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-md transition duration-300"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
