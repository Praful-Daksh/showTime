import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import api from '../Partials/api';
import swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Checkout = () => {
    const [classicQuantity, setClassicQuantity] = useState(1);
    const [vipQuantity, setVipQuantity] = useState(0);
    const [displayPrice, setdisplayPrice] = useState(0);
    const [vipPrice, setVipPrice] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [gstAmount, setGstAmount] = useState(0);
    const [ticketDetails, setTicketDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [remainingClassic,setremainClassic] = useState(0)
    const [remainingVip,setremainVip] = useState(0)
    const navigate = useNavigate();
    const params = useParams();
    const url = api.production;
    const user = JSON.parse(localStorage.getItem('user'))
    const showId = params.showId;

    const showError = () => {
        withReactContent(swal).fire({
            icon: "error",
            title: "Oops...",
            text: "Sorry we don't have that much Left, Try Lowering the Number",
        });
    }



    const fetchShows = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${url}/dashboard/checkout/${showId}`, {
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
                setremainClassic(data.show.available);
                setremainVip(data.show.vipAvailable)
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
        let gst = (classicQuantity * displayPrice + vipQuantity * vipPrice) * 0.18;
        let total = (classicQuantity * displayPrice + vipQuantity * vipPrice) + gst;
        setTotalAmount(Math.round(total));
        setGstAmount(gst);
    }, [classicQuantity, vipQuantity, displayPrice, vipPrice]);

    const handleClassicChange = (e) => {
        setClassicQuantity(parseInt(e.target.value));
    };

    const handleVipChange = (e) => {
        setVipQuantity(parseInt(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!ticketDetails) {
            toast.error('Ticket details not loaded', { position: 'top-right' });
            return;
        }
        if (classicQuantity > remainingClassic || vipQuantity > remainingVip) {
            showError();
            return;
        }
        try {
            const res = await fetch(`${url}/payment/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    amount: totalAmount,
                    classicQuantity: classicQuantity,
                    vipQuantity: vipQuantity,
                    showId: showId
                })
            });

            const data = await res.json();

            if (!data.success) {
                toast.error("Failed to initiate payment", { position: 'top-right' });
                return;
            }

            const { order } = data;
            const options = {
                key: process.env.REACT_APP_RZRPY_KEY,
                amount: order.amount,
                currency: 'INR',
                name: 'ShowTime',
                description: 'Enjoy the Show',
                order_id: order.id,
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: {
                    color: '#54a9f3'
                },
                handler: async function (response) {
                    try {
                        const verifyRes = await fetch(`${url}/payment/verify`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('authToken')
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });

                        const verifyData = await verifyRes.json();

                        if (verifyData.success) {
                            navigate(`/dashboard/payment/success?orderId=${response.razorpay_order_id}`);
                        } else {
                            toast.error("Payment verification failed", { position: 'top-right' });
                        }
                    } catch (error) {
                        console.error("Verification error:", error);
                        toast.error("Payment verification failed", { position: 'top-right' });
                    }
                },
                modal: {
                    ondismiss: function () {
                        toast.error("Payment cancelled", { position: 'top-right' });
                    }
                }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        }
        catch (error) {
            console.error("Payment initiation error:", error);
            toast.error("Something went wrong", { position: 'top-right' });
        }
    };

    const isCheckoutDisabled = classicQuantity === 0 && vipQuantity === 0;

    // const remainingClassic = (ticketDetails?.quantity - ticketDetails?.sold);
    // const remainingvip = (ticketDetails?.vipQuantity - ticketDetails?.vipSold);

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
                                                    disabled={!ticketDetails}
                                                    className="w-24 p-2 border border-gray-300 rounded-md"
                                                >
                                                    {[...Array(Math.min(5, remainingClassic) + 1).keys()].map(i => (
                                                        <option key={i} value={i}>{i}</option>
                                                    ))}                                                </select>
                                            </div>

                                            {/* VIP Ticket */}
                                            <div className="mb-4">
                                                <h3 className="text-xl font-medium">VIP - ₹{vipPrice}</h3>
                                                <label htmlFor="vipQuantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                                <select
                                                    id="vipQuantity"
                                                    value={vipQuantity}
                                                    onChange={handleVipChange}
                                                    disabled={!ticketDetails}
                                                    className="w-24 p-2 border border-gray-300 rounded-md"
                                                >
                                                    {[...Array(Math.min(5, remainingVip) + 1).keys()].map(i => (
                                                        <option key={i} value={i}>{i}</option>
                                                    ))}                                                </select>
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
                            <p className="text-gray-700">+ GST 18% - {Math.round(gstAmount)}</p>
                            <hr className="my-3 border-gray-200" />
                            <h4 className="font-medium text-lg">Total: ₹{totalAmount}</h4>
                        </div>

                        <button
                            type='submit'
                            disabled={isCheckoutDisabled}
                            onClick={handleSubmit}
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
