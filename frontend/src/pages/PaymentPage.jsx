import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // For clearCart
const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.2, duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
};

const formVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
};

function PaymentPage() {
    const [cartItems, setCartItems] = useState([]);
    const [paymentError, setPaymentError] = useState(null);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const navigate = useNavigate();
    const { clearCart } = useCart();

    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setPaymentError('Authentication token not found.');
                return;
            }
            try {
                const res = await fetch('/api/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json();
                if (res.ok) {
                    setCartItems(data.items || []);
                } else {
                    setPaymentError(data.message || 'Failed to fetch cart.');
                }
            } catch (err) {
                console.error(err);
                setPaymentError('Could not load cart.');
            }
        };
        fetchCart();
    }, []);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2);
    };

    const totalAmount = calculateTotal();
    const shippingFee = cartItems.length > 0 ? 5.00 : 0.00;
    const grandTotal = (parseFloat(totalAmount) + shippingFee).toFixed(2);

    const handleCompletePayment = async (e) => {
        e.preventDefault();
        setPaymentLoading(true);
        setPaymentError(null);

        const token = localStorage.getItem('authToken');
        if (!token) {
            setPaymentError('Please log in again.');
            setPaymentLoading(false);
            return;
        }

        if (cartItems.length === 0) {
            setPaymentError('Your cart is empty.');
            setPaymentLoading(false);
            return;
        }

        const orderItems = cartItems.map(item => ({
            product: item.productId._id,
            quantity: item.quantity,
        }));

        const orderData = {
            items: orderItems,
            totalAmount: parseFloat(grandTotal),
            shippingAddress: {
                name: localStorage.getItem('shippingName') || '',
                address: localStorage.getItem('shippingAddress') || '',
                city: localStorage.getItem('shippingCity') || '',
                zip: localStorage.getItem('shippingZip') || '',
            },
            paymentMethod: 'Credit Card',
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Payment failed');
            }

            const data = await response.json();
            clearCart();
            navigate('/order-success', { state: { orderId: data.order._id } });
        } catch (error) {
            console.error('Error processing payment:', error);
            setPaymentError(error.message || 'Failed to process payment');
        } finally {
            setPaymentLoading(false);
        }
    };

    return (
        <motion.div
            className="bg-gradient-to-br from-yellow-50 to-orange-100 min-h-screen py-16 px-6"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="container mx-auto">
                <motion.h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center" variants={formVariants}>
                    Payment
                </motion.h2>
                <div className="bg-white shadow-md rounded-lg p-8">
                    <motion.h3 className="text-xl font-semibold text-gray-700 mb-6" variants={formVariants}>
                        Order Summary
                    </motion.h3>
                    <ul>
                        {cartItems.map((item) => (
                            <motion.li
                                key={item.productId._id}
                                className="flex items-center py-3 border-b border-gray-200"
                                variants={formVariants}
                            >
                                <img src={item.productId.image} alt={item.productId.name} className="w-16 h-16 object-cover rounded mr-4" />
                                <div className="flex-grow">
                                    <h4 className="text-lg font-semibold text-gray-700">{item.productId.name}</h4>
                                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                                <span className="text-gray-700">${(item.productId.price * item.quantity).toFixed(2)}</span>
                            </motion.li>
                        ))}
                    </ul>
                    <div className="mt-6 py-3 border-b border-gray-200">
                        <div className="flex justify-between text-gray-700">
                            <span>Subtotal:</span>
                            <span>${totalAmount}</span>
                        </div>
                        <div className="flex justify-between text-gray-700 mt-2">
                            <span>Shipping:</span>
                            <span>${shippingFee.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-between text-xl font-semibold text-gray-800">
                        <span>Total:</span>
                        <span>${grandTotal}</span>
                    </div>

                    <motion.div className="mt-8" variants={formVariants}>
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Payment Details</h3>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-bold mb-2">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    className="shadow border rounded w-full py-2 px-3"
                                    placeholder="Enter your card number"
                                />
                            </div>
                            <div>
                                <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-bold mb-2">
                                    Expiry Date
                                </label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    className="shadow border rounded w-full py-2 px-3"
                                    placeholder="MM/YY"
                                />
                            </div>
                            <div>
                                <label htmlFor="cvv" className="block text-gray-700 text-sm font-bold mb-2">
                                    CVV
                                </label>
                                <input
                                    type="text"
                                    id="cvv"
                                    className="shadow border rounded w-full py-2 px-3"
                                    placeholder="CVV"
                                />
                            </div>
                            <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 w-full focus:outline-none"
                                onClick={handleCompletePayment}
                                disabled={paymentLoading || cartItems.length === 0}
                            >
                                {paymentLoading ? 'Processing...' : 'Complete Payment'}
                            </motion.button>
                            {paymentError && <p className="text-red-500 mt-4">{paymentError}</p>}
                        </form>
                    </motion.div>

                    <motion.div className="mt-6 text-center" variants={formVariants}>
                        <Link to="/checkout" className="text-indigo-600 hover:underline">
                            Back to Checkout
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export default PaymentPage;
