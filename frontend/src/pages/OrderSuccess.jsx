import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function OrderSuccess() {
    const location = useLocation();
    const orderId = location.state?.orderId;

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 text-gray-800 px-4">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
                <h2 className="text-2xl font-semibold mb-4">🎉 Order Placed Successfully!</h2>
                {orderId ? (
                    <>
                        <p className="mb-4">Your order ID is:</p>
                        <p className="font-mono text-lg text-green-600 mb-6">{orderId}</p>
                    </>
                ) : (
                    <p className="text-red-500">No order ID found.</p>
                )}
                <Link to="/" className="text-indigo-600 hover:underline">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}

export default OrderSuccess;
 