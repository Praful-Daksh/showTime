import { useState, useEffect, use } from 'react';
import Navbar from '../Components/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import api from '../Partials/api';

const Checkout = () => {
    const [classicQuantity, setClassicQuantity] = useState(1);
    const [vipQuantity, setVipQuantity] = useState(0);
    const [displayPrice, setdisplayPrice] = useState(0);
    const [vipPrice, setVipPrice] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [gstAmount,setGstAmount] = useState(0);
    const [ticketDetails, setTicketDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const url = api.production;

    const fetchShows = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${url}/dashboard/checkout/${params.showId}`, {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('authToken')
                }
            });
            const data = await response.json();
            setLoading(false);
            if (data.success) {
                setTicketDetails(data.show);
                setdisplayPrice(data.show.price);
                setVipPrice(data.show.vipPrice);
            } else {
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
        fetchShows();
    }, []);

    useEffect(() => {
        const gst = (classicQuantity * displayPrice + vipQuantity * vipPrice) * 0.18;
        const total = (classicQuantity * displayPrice + vipQuantity * vipPrice) + gst;
        setTotalAmount(total);
        setGstAmount(gst);
    }, [classicQuantity, vipQuantity, displayPrice, vipPrice]);

    const handleClassicChange = (e) => {
        setClassicQuantity(parseInt(e.target.value));
    };

    const handleVipChange = (e) => {
        setVipQuantity(parseInt(e.target.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Classic: ${classicQuantity}, VIP: ${vipQuantity}, Total: ₹${totalAmount}`);
    };

    const isCheckoutDisabled = classicQuantity === 0 && vipQuantity === 0;

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto p-4 mt-20">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Side */}
                    <div className="md:w-2/3">
                        <h3 className="text-xl font-semibold">Checkout</h3>
                        <p className="text-gray-600 mb-4">Select your tickets</p>
                        <hr className="my-4 border-gray-200" />

                        <div className="mb-6">
                            <form onSubmit={handleSubmit} className="mt-4">
                                {
                                    ticketDetails?.types?.length > 1 ? (
                                        <>
                                            {/* Classic Ticket */}
                                            <div className="mb-4">
                                                <h3 className="text-xl font-medium">Classic - ₹{displayPrice}</h3>
                                                <label htmlFor="classicQuantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                                <select
                                                    id="classicQuantity"
                                                    value={classicQuantity}
                                                    onChange={handleClassicChange}
                                                    className="w-24 p-2 border border-gray-300 rounded-md"
                                                >
                                                    {[...Array(6).keys()].map(i => <option key={i} value={i}>{i}</option>)}
                                                </select>
                                            </div>

                                            {/* VIP Ticket */}
                                            <div className="mb-4">
                                                <h3 className="text-xl font-medium">VIP - ₹{vipPrice}</h3>
                                                <label htmlFor="vipQuantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                                <select
                                                    id="vipQuantity"
                                                    value={vipQuantity}
                                                    onChange={handleVipChange}
                                                    className="w-24 p-2 border border-gray-300 rounded-md"
                                                >
                                                    {[...Array(6).keys()].map(i => <option key={i} value={i}>{i}</option>)}
                                                </select>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="mb-4">
                                            <h3 className="text-xl font-medium">Classic - ₹{displayPrice}</h3>
                                            <label htmlFor="classicQuantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                            <select
                                                id="classicQuantity"
                                                value={classicQuantity}
                                                onChange={handleClassicChange}
                                                className="w-24 p-2 border border-gray-300 rounded-md"
                                            >
                                                {[1, 2, 3, 4, 5].map(i => <option key={i} value={i}>{i}</option>)}
                                            </select>
                                        </div>
                                    )
                                }

                                <hr className="my-4 border-gray-200" />

                                <button
                                    type="submit"
                                    disabled={isCheckoutDisabled}
                                    className="hidden md:block w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded transition-colors"
                                >
                                    Check out
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="md:w-1/3">
                        <div className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium text-lg mb-2">Order summary</h4>
                            {classicQuantity > 0 && <p className="text-gray-700">{classicQuantity} x Classic - ₹{classicQuantity * displayPrice}</p>}
                            {vipQuantity > 0 && <p className="text-gray-700">{vipQuantity} x VIP - ₹{vipQuantity * vipPrice}</p>}
                            <p className="text-gray-700">+ GST 18% - {gstAmount}</p>
                            <hr className="my-3 border-gray-200" />
                            <h4 className="font-medium text-lg">Total: ₹{totalAmount}</h4>
                        </div>

                        <button
                            type='submit'
                            disabled={isCheckoutDisabled}
                            className="md:hidden w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded mt-4 transition-colors"
                        >
                            Check out
                        </button>
                    </div>
                </div>
            </div>
            {
                loading &&
                <div className='overlay-loader'>
                    <HashLoader color='#000000' size={25} />
                </div>
            }
        </>
    );
};

export default Checkout;
