import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';

const Checkout = () => {
    // State for ticket details
    const [quantity, setQuantity] = useState(1);
    const [displayPrice] = useState(456); // Display price shown in the left side
    const [actualPrice] = useState(123);  // Actual price per ticket shown in the summary
    const [platformFee] = useState(49);   // Platform fee
    const [totalAmount, setTotalAmount] = useState(0);

    // Calculate total amount whenever quantity changes
    useEffect(() => {
        setTotalAmount(quantity * actualPrice + platformFee);
    }, [quantity, actualPrice, platformFee]);

    // Handle quantity change
    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Process checkout logic would go here
        console.log(`Checking out ${quantity} tickets for ₹${totalAmount}`);
    };

    return (
        <>
        <Navbar />
            <div className="max-w-6xl mx-auto p-4 mt-20">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Side */}
                    <div className="md:w-2/3">
                        <h3 className="text-xl font-semibold">hello</h3>
                        <p className="text-gray-600 mb-4">today</p>
                        <hr className="my-4 border-gray-200" />

                        <div className="mb-6">
                            <h3 className="text-xl font-medium">Classic</h3>
                            <p className="text-lg">₹ {displayPrice}</p>

                            <form onSubmit={handleSubmit} className="mt-4">
                                <div className="mb-4">
                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                                        Quantity
                                    </label>
                                    <select
                                        id="quantity"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Hurry, Only 15 Left</p>
                                </div>

                                <hr className="my-4 border-gray-200" />

                                <button
                                    type="submit"
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
                            <p className="text-gray-700">{quantity} X Classic - ₹{actualPrice}</p>
                            <p className="text-gray-700">Platform Fees - ₹{platformFee}</p>
                            <hr className="my-3 border-gray-200" />
                            <h4 className="font-medium text-lg">Total: ₹{totalAmount}</h4>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="md:hidden w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded mt-4 transition-colors"
                        >
                            Check out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
