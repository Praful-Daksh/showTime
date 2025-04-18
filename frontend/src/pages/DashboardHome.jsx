import React from 'react';
import Navigation from '../Components/Navigation';
import Header from '../Components/Header';

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="flex-1 p-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
              <div className="bg-white shadow-sm rounded-lg border">
                <div className="p-4 text-center">
                  <h3 className="text-2xl font-semibold">10</h3>
                  <p className="text-gray-600">Events</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
              <div className="bg-white shadow-sm rounded-lg border">  
                <div className="p-4 text-center">
                  <h3 className="text-2xl font-semibold">0</h3>
                  <p className="text-gray-600">Tickets Sold</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
              <div className="bg-white shadow-sm rounded-lg border">
                <div className="p-4 text-center">
                  <h3 className="text-2xl font-semibold">$0</h3>
                  <p className="text-gray-600">Total Revenue</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
              <div className="bg-white shadow-sm rounded-lg border">
                <div className="p-4 text-center">
                  <h3 className="text-2xl font-semibold">$0</h3>
                  <p className="text-gray-600">Total Revenue</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg mt-4 border">
            <div className="border-b px-4 py-2 font-semibold text-gray-700">
              Upcoming Events
            </div>
            <div className="p-4 space-y-2 max-h-[300px] overflow-y-auto">
              {Array(8).fill().map((_, i) => (
                <div key={i} className="bg-white shadow-sm rounded-md border p-4">
                  <div className="text-m font-semibold">Concert</div>
                  <div className="text-sm text-gray-500">23th July</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Navigation/>
    </>
  );
};

export default Dashboard;
