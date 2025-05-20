import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = ({ paymentRefId }) => {
    const navigate = useNavigate();

    const handleDownload = () => {
        alert('Receipt download initiated.');
    };

    const handleGoHome = () => {
        navigate('/dashboard/home');
    };


    const query = new URLSearchParams(useLocation().search);
    const refId = query.get('ref');

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
                <h1 className="text-2xl font-semibold text-green-600 mb-4">Payment Successful</h1>

                <p className="text-gray-700 mb-2">Reference ID: {refId}</p>

                <button
                    onClick={handleDownload}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200"
                >
                    Download Tickets
                </button>

                <p className="text-sm text-gray-500 mt-2 mb-6">
                    You can download it later by visiting your profile.
                </p>

                <button
                    onClick={handleGoHome}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-200"
                >
                    Go Back to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
