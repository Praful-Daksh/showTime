import React, { useState } from 'react';

const PublishTicket = () => {
    const [ticketData, setTicketData] = useState({
        ticketName: '',
        price: '',
        quantity: '',
        description: '',
        ticketType: 'Standard',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicketData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const publishTicket = (e) => {
        e.preventDefault();
        console.log('Publishing ticket:', ticketData);
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-6 bg-gray-100">
            <div className="bg-white shadow-lg p-8 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 border">
                <div className="flex flex-col justify-center items-center text-center">
                    <img
                        src="https://via.placeholder.com/300x200"
                        alt="Event Promo"
                        className="mb-4 w-full object-cover rounded"
                    />
                    <p className="text-gray-700 text-lg">
                        Unlock powerful features and gain visibility when you publish your ticket. Manage attendees, track sales, and make your event a success!
                    </p>
                </div>

                {/* RIGHT COLUMN - TICKET FORM */}
                <form className="space-y-4" onSubmit={publishTicket}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ticket Name</label>
                        <input
                            type="text"
                            placeholder="e.g., VIP Pass"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            name="ticketName"
                            value={ticketData.ticketName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                            <input
                                type="number"
                                placeholder="e.g., 50"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                name="price"
                                value={ticketData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input
                                type="number"
                                placeholder="e.g., 100"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                name="quantity"
                                value={ticketData.quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ticket Type</label>
                        <select
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            name="ticketType"
                            value={ticketData.ticketType}
                            onChange={handleChange}
                            required
                        >
                            <option value="Standard">Standard</option>
                            <option value="VIP">VIP</option>
                            <option value="Early Bird">Early Bird</option>
                            <option value="Student">Student</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ticket Buy Last Date</label>
                        <input
                            type="date"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            name="lastDate"
                            value={ticketData.lastDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                    >
                        Publish Ticket
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PublishTicket;
