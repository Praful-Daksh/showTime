import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

const TICKET_TYPES = ['Standard', 'VIP'];

const PublishTicket = () => {
    const navigate = useNavigate();
    const params = useParams();
    const eventId = params.eventId;
    const eventData = JSON.parse(localStorage.getItem('userEvents')).find(event => event._id === eventId);
    const [ticketData, setTicketData] = useState({
        ticketName: '',
        price: 0,
        quantity: 0,
        ticketTypes: [],
        lastDate: '',
        vipPrice: 0,
        vipQuantity: 0,
    });
    const [loading, setLoading] = useState(false);
    const [dataValid, setDataValid] = useState(false);

    useEffect(() => {
        const isValid = () => {
            if (ticketData.ticketTypes.length > 0 &&
                ticketData.ticketName !== '' &&
                ticketData.lastDate !== '' &&
                ticketData.price !== 0 &&
                ticketData.quantity !== 0) {
                if (ticketData.ticketTypes.includes('VIP')) {
                    if (ticketData.vipPrice !== 0 && ticketData.vipQuantity !== 0 ) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }

        setDataValid(isValid())

    }, [ticketData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicketData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTypeCheckbox = (e) => {
        const { value, checked } = e.target;
        setTicketData((prev) => {
            const updatedTypes = checked
                ? [...prev.ticketTypes, value]
                : prev.ticketTypes.filter((type) => type !== value);

            return { ...prev, ticketTypes: updatedTypes };
        });
    };

    const publishTicket = (e) => {
        e.preventDefault();
        if (!dataValid) {
            toast.error('Please fill all required fields correctly!', { position: 'top-center' });
            return;
        }
        try {
            setLoading(true);
            console.log(ticketData)
            const url = `https://backshow.onrender.com/dashboard/publishTicket/${eventId}`
            const url2 = `http://localhost:5000/dashboard/publishTicket/${eventId}`
            const response = fetch(url, {
                method: "POST",
                headers: {
                    'Authorization': localStorage.getItem('authToken'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ticketData, eventData }),
            });
            response.then(res => res.json()).then(data => {
                setLoading(false);
                if (data.success) {
                    toast.success(data.message, { position: 'top-center' });
                    navigate('/dashboard/home')
                } else {
                    toast.error(data.message, { position: 'top-center' });
                }
            })
        } catch (err) {
            setLoading(false);
            console.log(err)
            toast.error('Something went wrong, Try again later', { position: 'top-right' })
        }
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen p-6 bg-gray-100">
                <div className="bg-white shadow-lg p-8 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 border">
                    <div className="flex flex-col justify-center items-center text-center">
                        <img
                            src="/media/ticket.png"
                            alt="Event Promo"
                            className="mb-4 w-full object-cover rounded"
                        />
                        <p className="text-gray-700 text-lg">
                            Unlock powerful features and gain visibility when you publish your ticket. Manage attendees, track sales, and make your event a success!
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={publishTicket}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ticket Name</label>
                            <input
                                type="text"
                                placeholder="e.g., Concert Entry"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                name="ticketName"
                                value={ticketData.ticketName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ticket Types</label>
                            <div className="mt-2 space-y-2">
                                {TICKET_TYPES.map((type) => (
                                    <label key={type} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            value={type}
                                            checked={ticketData.ticketTypes.includes(type)}
                                            onChange={handleTypeCheckbox}
                                            className="h-4 w-4 text-green-600 border-gray-300 rounded"
                                        />
                                        <span>{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>


                        {ticketData.ticketTypes.includes('Standard') && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Standard Price ($)</label>
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
                                    <label className="block text-sm font-medium text-gray-700">Standard Quantity</label>
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
                        )}

                        {ticketData.ticketTypes.includes('VIP') && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">VIP Price ($)</label>
                                    <input
                                        type="number"
                                        placeholder="e.g., 150"
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        name="vipPrice"
                                        value={ticketData.vipPrice}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">VIP Quantity</label>
                                    <input
                                        type="number"
                                        placeholder="e.g., 20"
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        name="vipQuantity"
                                        value={ticketData.vipQuantity}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        )}

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
                            className={dataValid ? "w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                                : "w-full bg-gray-400 text-white py-2 rounded-md cursor-not-allowed"}
                            disabled={!dataValid}
                        >
                            Publish Ticket
                        </button>
                    </form>
                </div>
            </div>
            {
                loading ?
                    <div className='overlay-loader'><HashLoader color='#000000' size={25} /></div>
                    : null
            }
        </>
    );
};

export default PublishTicket;
