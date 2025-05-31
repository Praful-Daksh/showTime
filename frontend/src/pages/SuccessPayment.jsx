import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import api from '../Partials/api';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const orderId = query.get('orderId');
    const [status, setStatus] = useState('Verifying payment...');
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const [orderDetails, setOrderDetails] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    const checkPaymentStatus = async () => {
        if (!orderId) {
            setStatus('No payment reference found.');
            setVerified(false);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${api.production}/payment/status?orderId=${orderId}`, {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('authToken')
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                setStatus('Payment Successful!');
                setVerified(true);
                setOrderDetails(data.orderDetails);
                setLoading(false);
            } else {
                if (retryCount < 3) {
                    setTimeout(() => {
                        setRetryCount(prev => prev + 1);
                        checkPaymentStatus();
                    }, 2000); 
                } else {
                    setStatus('Payment verification pending. Please contact support if this persists.');
                    setVerified(false);
                    setLoading(false);
                }
            }
        } catch (error) {
            console.error('Payment status check error:', error);
            if (retryCount < 3) {
                setTimeout(() => {
                    setRetryCount(prev => prev + 1);
                    checkPaymentStatus();
                }, 2000);
            } else {
                setStatus('Error checking payment status. Please contact support.');
                setVerified(false);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        checkPaymentStatus();
    }, []);

    const handleDownload = async () => {
        try {
            const response = await fetch(`${api.production}/tickets/download?orderId=${orderId}`, {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('authToken')
                }
            });
            
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `tickets-${orderId}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else {
                alert('Failed to download tickets. Please try again later.');
            }
        } catch (error) {
            console.error('Download error:', error);
            alert('Failed to download tickets. Please try again later.');
        }
    };

    const handleRetry = () => {
        setLoading(true);
        setRetryCount(0);
        checkPaymentStatus();
    };

    // Loading state with spinner
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
                <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
                    <HashLoader color="#3B82F6" size={40} />
                    <h2 className="text-xl font-semibold mt-4 text-gray-700">{status}</h2>
                    <p className="text-gray-500 mt-2">Please wait while we confirm your payment...</p>
                    {retryCount > 0 && (
                        <p className="text-sm text-gray-400 mt-2">
                            Retry attempt {retryCount} of 3
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // Main success/failure UI
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
                <div className="mb-4">
                    {verified ? (
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    ) : (
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    )}
                </div>

                <h1 className={`text-2xl font-semibold mb-4 ${verified ? 'text-green-600' : 'text-red-600'}`}>
                    {status}
                </h1>
                
                <div className="mb-6">
                    <p className="text-gray-700 mb-2">
                        <span className="font-medium">Order ID:</span> {orderId}
                    </p>
                    {orderDetails && (
                        <div className="text-sm text-gray-600 mt-3 p-3 bg-gray-50 rounded">
                            <p><span className="font-medium">Tickets:</span> {orderDetails.totalTickets}</p>
                            <p><span className="font-medium">Total Amount:</span> ₹{orderDetails.totalAmount}</p>
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    {verified ? (
                        <>
                            <button
                                onClick={handleDownload}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded transition duration-200"
                            >
                                Download Tickets
                            </button>
                            <p className="text-sm text-gray-500">
                                You can download your tickets anytime from your profile.
                            </p>
                        </>
                    ) : (
                        <button
                            onClick={handleRetry}
                            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded transition duration-200"
                        >
                            Retry Verification
                        </button>
                    )}
                    
                    <button
                        onClick={() => navigate('/dashboard/home')}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded transition duration-200"
                    >
                        Go Back to Home
                    </button>
                </div>

                {!verified && (
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-sm text-yellow-800">
                            <strong>Need Help?</strong><br />
                            If your payment was deducted but verification failed, please contact our support team with your Order ID.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccess;