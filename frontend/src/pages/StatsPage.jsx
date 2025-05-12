import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import api from '../Partials/api';
import {toast } from 'react-toastify';

const EventAnalytics = () => {
    
    const eventData = {
        name: "Birthday Party",
        date: "Wed Jul 30 2025",
        venue: "Mahaveer Farm House, Greater Noida",
        totalRevenue: 145000,
        ticketsSold: 85,
        totalCapacity: 120,
        price: 1500,
        salesByDay: [
            { day: 'May 12', sales: 5, revenue: 7500 },
            { day: 'May 13', sales: 8, revenue: 12000 },
            { day: 'May 14', sales: 15, revenue: 22500 },
            { day: 'May 15', sales: 12, revenue: 18000 },
            { day: 'May 16', sales: 20, revenue: 30000 },
            { day: 'May 17', sales: 18, revenue: 27000 },
            { day: 'May 18', sales: 7, revenue: 10500 },
        ],
        ticketTypes: [
            { name: 'Regular', value: 60 },
            { name: 'VIP', value: 15 },
        ]
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
    const availableTickets = eventData.totalCapacity - eventData.ticketsSold;
    const showId = useParams().id;

    const url = api.production;
    const navigate = useNavigate();

    const fetchShowDetails = async () => {
       try {
         setLoading(true);
         const response = await fetch(`${url}/dashboard/published/${showId}`, {
           method: 'GET',
         });
         const data = await response.json();
         setLoading(false);
         if (data.success) {
           console.log(data);
           toast.success('Show details fetched successfully', { position: 'top-right' });
         } else {
           toast.error('Invalid Id', { position: 'top-right' });
           navigate('/dashboard/home');
         }
       } catch (err) {
         setLoading(false);
         toast.error('Something went wrong', { position: 'top-right' });
         navigate('/dashboard/home');
         console.log(err);
       }
     };
   
     useEffect(() => {
       fetchShowDetails();
     }, []);























    return (
        <div className=" bg-gray-50 p-5 mt-0">
            {/* Event Header */}
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800">{eventData.name} - Analytics</h1>
                <p className="text-sm text-gray-600">{eventData.date} | {eventData.venue}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow p-4 bg-gradient-to-br from-white to-blue-50">
                    <h3 className="text-sm font-medium text-gray-600 mb-1">Total Revenue</h3>
                    <p className="text-2xl font-bold text-gray-800">₹{eventData.totalRevenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Avg per ticket: ₹{Math.round(eventData.totalRevenue / eventData.ticketsSold).toLocaleString()}</p>
                </div>

                <div className="bg-white rounded-xl shadow p-4 bg-gradient-to-br from-white to-green-50">
                    <h3 className="text-sm font-medium text-gray-600 mb-1">Tickets Sold</h3>
                    <p className="text-2xl font-bold text-gray-800">{eventData.ticketsSold}</p>
                    <p className="text-xs text-gray-500">{Math.round((eventData.ticketsSold / eventData.totalCapacity) * 100)}% of capacity</p>
                </div>

                <div className="bg-white rounded-xl shadow p-4 bg-gradient-to-br from-white to-amber-50">
                    <h3 className="text-sm font-medium text-gray-600 mb-1">Remaining Tickets</h3>
                    <p className="text-2xl font-bold text-gray-800">{availableTickets}</p>
                    <p className="text-xs text-gray-500">Potential revenue: ₹{(availableTickets * eventData.ticketPrice).toLocaleString()}</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 z-4">
                <div className="bg-white rounded-xl shadow p-4">
                    <h3 className="text-base font-medium text-gray-800 mb-4">Ticket Distribution</h3>
                    <div className="flex items-center">
                        <ResponsiveContainer width="60%" height={200}>
                            <PieChart>
                                <Pie
                                    data={eventData.ticketTypes}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    label
                                >
                                    {eventData.ticketTypes.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="ml-2">
                            {eventData.ticketTypes.map((entry, index) => (
                                <div className="flex items-center mb-2" key={`legend-${index}`}>
                                    <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                    <span className="text-xs text-gray-700">{entry.name}: {entry.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sales Table */}
            <div className="bg-white rounded-xl shadow p-4 mb-6">
                <h3 className="text-base font-medium text-gray-800 mb-4">Daily Sales Breakdown</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets Sold</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue (₹)</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {eventData.salesByDay.map((day, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-4 py-3 text-sm text-gray-900">{day.day}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900">{day.sales}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900">₹{day.revenue.toLocaleString()}</td>
                                </tr>
                            ))}
                            <tr className="bg-gray-100">
                                <td className="px-4 py-3 text-sm font-bold text-gray-900">Total</td>
                                <td className="px-4 py-3 text-sm font-bold text-gray-900">{eventData.ticketsSold}</td>
                                <td className="px-4 py-3 text-sm font-bold text-gray-900">₹{eventData.totalRevenue.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full font-medium transition-colors">
                    Export Report
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full font-medium transition-colors">
                    Share Analysis
                </button>
            </div>
        </div>
    );
};

export default EventAnalytics;
