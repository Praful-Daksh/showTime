import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import api from '../Partials/api';
import { toast } from 'react-toastify';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
const data = [
    { name: 'Standarad', value: 60 },
    { name: 'Remaining', value: 40 },
];

const COLORS = ['#0088FE', '#FF8042'];

const EventAnalytics = () => {
    const [loading, setLoading] = React.useState(false);;
    const navigate = useNavigate();
    const eventId = useParams().eventId;
    const [event, setEvent] = useState(null);
    const [totalRevenue, setTotalRevenue] = useState(0);

    const fetchShowDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${api.production}/dashboard/published/events/${eventId}`, {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('authToken')
                }
            });
            const data = await response.json();
            setLoading(false);
            if (data.success) {
                setEvent(data.ticket);
                setTotalRevenue((data.ticket.sold * data.ticket.price) + (data.ticket.vipSold * data.ticket.vipPrice));
            } else {
                toast.error(data.message, { position: 'top-right' });
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
        <>
            <div className=" bg-gray-50 p-5 mt-0">
                {/* Event Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">{event?.ticketName} - Analytics</h1>
                    <p className="text-sm text-gray-600">{new Date(event?.showDate).toDateString()}| {event?.showVenue}, {event?.showCity}</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow p-4 bg-gradient-to-br from-white to-blue-50">
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Total Revenue</h3>
                        <p className="text-2xl font-bold text-gray-800">₹{totalRevenue}</p>
                        <p className="text-xs text-gray-500">Avg per ticket: ₹{totalRevenue > 0 ?(totalRevenue / (event?.sold + event?.vipSold)) : 0}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-4 bg-gradient-to-br from-white to-green-50">
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Tickets Sold</h3>
                        <p className="text-2xl font-bold text-gray-800">{event?.sold + event?.vipSold}</p>
                        <p className="text-xs text-gray-500">{Math.round(((event?.sold + event?.vipSold) / event?.quantity) * 100)}% of capacity</p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-4 bg-gradient-to-br from-white to-amber-50">
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Remaining Tickets</h3>
                        <p className="text-2xl font-bold text-gray-800">{(event?.vipQuantity + event?.quantity) - (event?.sold + event?.vipSold)}</p>
                        <p className="text-xs text-gray-500">Potential revenue: ₹{(((event?.vipQuantity + event?.quantity) - (event?.sold + event?.vipSold)) * (event?.vipPrice + event?.price))}</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 z-4">
                    <div className="bg-white rounded-xl shadow p-4">
                        <h3 className="text-base font-medium text-gray-800 mb-4">Ticket Distribution</h3>
                        <div className="flex items-center">

                            <PieChart width={300} height={300}>
                                <Pie
                                    data={[
                                        { name: 'Standarad', value: event?.quantity },
                                        { name: 'VIP', value: event?.vipQuantity }
                                    ]}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label
                                >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>

                        <div className="ml-2">
                            <div className="flex items-center mb-2" >
                                <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: COLORS[0 % COLORS.length] }}></div>
                                <span className="text-xs text-gray-700">Standard: {event?.quantity}</span>
                            </div>
                            <div className="flex items-center mb-2" >
                                <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: COLORS[1 % COLORS.length] }}></div>
                                <span className="text-xs text-gray-700">VIP: {event?.vipQuantity}</span>
                            </div>
                        </div>


                    </div >
                </div >
            </div >

            {/* Sales Table */}
            {/* <div className="bg-white rounded-xl shadow p-4 mb-6">
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
            </div> */}

            {/* Action Buttons */}
            {/* <div className="flex justify-center space-x-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full font-medium transition-colors">
                    Export Report
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full font-medium transition-colors">
                    Share Analysis
                </button>
            </div> */}
        </div >
        {
            loading?
                <div className = 'overlay-loader'>
                        < HashLoader color = '#000000' size = { 25} />
                    </div >
                    : null
            }
        </>
    );
};

export default EventAnalytics;
