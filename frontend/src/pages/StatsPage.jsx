import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import api from '../Partials/api';
import { toast } from 'react-toastify';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';


const COLORS = ['#0088FE', '#FF8042'];

const EventAnalytics = () => {
    const [loading, setLoading] = React.useState(false);;
    const navigate = useNavigate();
    const eventId = useParams().eventId;
    const [event, setEvent] = useState(null);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [deals, setDeals] = useState([]);

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
                let totalClassic = data.ticket.sold * data.ticket.price;
                let totalVip = data.ticket.vipSold * data.ticket.vipPrice;
                setTotalRevenue(totalClassic + totalVip);
                setDeals(data.transactions);
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

    const pieData = [
        { name: 'Standarad', value: event?.quantity },
        { name: 'VIP', value: event?.vipQuantity }
    ];

    const totalCapacity = (event?.quantity || 0) + (event?.vipQuantity || 0);
    const totalSold = (event?.sold || 0) + (event?.vipSold || 0);
    const remainingStandard = (event?.quantity || 0) - (event?.sold || 0);
    const remainingVip = (event?.vipQuantity || 0) - (event?.vipSold || 0);
    const totalRemaining = remainingStandard + remainingVip;
    const potentialRevenue =
        (remainingStandard * (event?.price || 0)) +
        (remainingVip * (event?.vipPrice || 0));
    const soldPercent = totalCapacity > 0 ? Math.round((totalSold / totalCapacity) * 100) : 0;
    const avgPerTicket = totalSold > 0 ? Math.round(totalRevenue / totalSold) : 0;

    return (
        <>
            <div className=" bg-gray-50 p-5 mt-0">
                {/* Event Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">{event?.ticketName} - Analytics</h1>
                    <p className="text-sm text-gray-600">{new Date(event?.showDate).toDateString()} | {event?.showVenue}, {event?.showCity}</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow p-4 bg-gradient-to-br from-white to-blue-50">
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Total Revenue</h3>
                        <p className="text-2xl font-bold text-gray-800">₹{totalRevenue}</p>
                        <p className="text-xs text-gray-500">Avg per ticket: ₹{avgPerTicket}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-4 bg-gradient-to-br from-white to-green-50">
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Tickets Sold</h3>
                        <p className="text-2xl font-bold text-gray-800">{totalSold}</p>
                        <p className="text-xs text-gray-500">{soldPercent}% of capacity</p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-4 bg-gradient-to-br from-white to-amber-50">
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Remaining Tickets</h3>
                        <p className="text-2xl font-bold text-gray-800">{totalRemaining}</p>
                        <p className="text-xs text-gray-500">Potential revenue: ₹{potentialRevenue}</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 z-4">
                    <div className="bg-white rounded-xl shadow p-4">
                        <h3 className="text-base font-medium text-gray-800 mb-4">Ticket Distribution</h3>
                        <div className="flex items-center">

                            <PieChart width={300} height={300}>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    dataKey="value"
                                    label
                                >
                                    {pieData.map((entry, index) => (
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

                {deals.length > 0 && (
                    <div className="bg-white rounded-xl shadow p-4 mb-6">
                        <h3 className="text-base font-medium text-gray-800 mb-4">Total Sales Breakdown</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets Sold</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue (₹) + gst</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {deals.map((deal, index) => (
                                        <>
                                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-4 py-3 text-sm text-gray-900">{new Date(deal.date).toDateString()}</td>
                                                <td className="px-4 py-3 text-sm text-gray-900">{deal.classic + deal.vip}</td>
                                                <td className="px-4 py-3 text-sm text-gray-900">₹{deal.amount}</td>
                                            </tr>
                                            {deal.messages.length > 0 && (
                                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} >
                                                   <td colSpan='3'  className="px-4 py-1 text-sm text-red-900">We're having some trouble to confirm this transaction.</td>
                                                </tr>
                                            )}
                                        </>
                                    ))}
                                    <tr className="bg-gray-100">
                                        <td className="px-4 py-3 text-sm font-bold text-gray-900">Total</td>
                                        <td className="px-4 py-3 text-sm font-bold text-gray-900">{totalSold}</td>
                                        <td className="px-4 py-3 text-sm font-bold text-gray-900">₹{totalRevenue} ( you'll get )</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

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
                loading ?
                    <div className='overlay-loader'>
                        < HashLoader color='#000000' size={25} />
                    </div >
                    : null
            }
        </>
    );
};

export default EventAnalytics;
