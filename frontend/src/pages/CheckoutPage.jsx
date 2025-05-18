import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.2, duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
};

const formVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] } },
};

const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
};

function CheckoutPage() {
    const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('productId');
    const [singleProduct, setSingleProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        city: '',
        zip: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (productId) {
            fetchProductDetails(productId);
        } else {
            setSingleProduct(null);
        }
    }, [productId]);

    const fetchProductDetails = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/products/${id}`);
            if (!response.ok) throw new Error('Failed to fetch product');
            const data = await response.json();
            setSingleProduct(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCartSingleProduct = async () => {
        if (singleProduct) {
            await addToCart(singleProduct._id, quantity); // ✅ uses new context method
            navigate('/checkout'); // reloads cart from DB
        }
    };

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleProceedToPayment = () => {
        localStorage.setItem('shippingName', shippingInfo.name);
        localStorage.setItem('shippingAddress', shippingInfo.address);
        localStorage.setItem('shippingCity', shippingInfo.city);
        localStorage.setItem('shippingZip', shippingInfo.zip);
        navigate('/payment');
    };

    const calculateSubtotal = (items) =>
        items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0).toFixed(2);

    const subtotal = calculateSubtotal(productId && singleProduct ? [{ productId: singleProduct, quantity }] : cart);
    const shippingFee = parseFloat(subtotal) > 0 ? 5.00 : 0.00;
    const totalAmount = (parseFloat(subtotal) + shippingFee).toFixed(2);

    if (loading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
    if (error) return <div className="min-h-screen flex justify-center items-center text-red-500">{error}</div>;

    // --- Single product "Buy Now" flow ---
    if (productId && singleProduct) {
        return (
            <motion.div className="bg-green-50 min-h-screen py-16 px-6" variants={containerVariants} initial="initial" animate="animate" exit="exit">
                <div className="container mx-auto">
                    <motion.h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center" variants={formVariants}>Checkout</motion.h2>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h3>
                        <div className="flex items-center mb-4">
                            <img src={singleProduct.image} alt={singleProduct.name} className="w-24 h-24 object-cover rounded mr-4" />
                            <div>
                                <h4 className="text-lg font-semibold text-gray-700">{singleProduct.name}</h4>
                                <p className="text-gray-500">${singleProduct.price}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="bg-gray-200 px-2 py-1 rounded">-</button>
                                    <span>{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="bg-gray-200 px-2 py-1 rounded">+</button>
                                </div>
                            </div>
                        </div>
                        <div className="border-t pt-4">
                            <div className="flex justify-between text-gray-700">
                                <span>Subtotal:</span>
                                <span>${(singleProduct.price * quantity).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Shipping:</span>
                                <span>${shippingFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg mt-2">
                                <span>Total:</span>
                                <span>${(singleProduct.price * quantity + shippingFee).toFixed(2)}</span>
                            </div>
                        </div>
                        <motion.button onClick={handleAddToCartSingleProduct} variants={buttonVariants} whileHover="hover" whileTap="tap" className="bg-teal-600 text-white w-full py-3 mt-6 rounded-full">
                            Add to Cart & Proceed
                        </motion.button>
                        <Link to="/checkout" className="block mt-4 text-center text-indigo-600 hover:underline">View Full Cart</Link>
                    </div>
                </div>
            </motion.div>
        );
    }

    // --- Regular cart checkout ---
    return (
        <motion.div className="bg-green-50 min-h-screen py-16 px-6" variants={containerVariants} initial="initial" animate="animate" exit="exit">
            <div className="container mx-auto">
                <motion.h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center" variants={formVariants}>Checkout</motion.h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Cart Items */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h3>
                        {cart.length === 0 ? (
                            <p className="text-gray-600">Your cart is empty.</p>
                        ) : (
                            cart.map(item => (
                                <motion.div key={item.productId._id} className="flex items-center py-3 border-b border-gray-200" variants={formVariants}>
                                    <img src={item.productId.image} alt={item.productId.name} className="w-16 h-16 object-cover rounded mr-4" />
                                    <div className="flex-grow">
                                        <h4 className="text-lg font-semibold text-gray-700">{item.productId.name}</h4>
                                        <p className="text-gray-500">${item.productId.price}</p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <button onClick={() => updateQuantity(item.productId._id, Math.max(1, item.quantity - 1))} className="bg-gray-200 px-2 py-1 rounded">-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.productId._id, item.quantity + 1)} className="bg-gray-200 px-2 py-1 rounded">+</button>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFromCart(item.productId._id)} className="text-red-500 hover:text-red-700 ml-4">Remove</button>
                                </motion.div>
                            ))
                        )}
                        {cart.length > 0 && (
                            <>
                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-gray-700">
                                        <span>Subtotal:</span>
                                        <span>${subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span>Shipping:</span>
                                        <span>${shippingFee.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg mt-2">
                                        <span>Total:</span>
                                        <span>${totalAmount}</span>
                                    </div>
                                </div>
                                <motion.button onClick={handleProceedToPayment} variants={buttonVariants} whileHover="hover" whileTap="tap" className="bg-teal-600 text-white w-full py-3 mt-6 rounded-full">
                                    Proceed to Payment
                                </motion.button>
                                <motion.button onClick={clearCart} className="mt-4 bg-gray-300 text-gray-700 w-full py-2 rounded-full">Clear Cart</motion.button>
                            </>
                        )}
                    </div>

                    {/* Shipping Form */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Shipping Information</h3>
                        <form className="space-y-4">
                            {['name', 'address', 'city', 'zip'].map((field) => (
                                <div key={field}>
                                    <label htmlFor={field} className="block text-gray-700 text-sm font-bold mb-2">
                                        {field[0].toUpperCase() + field.slice(1)}
                                    </label>
                                    <input
                                        type="text"
                                        id={field}
                                        name={field}
                                        value={shippingInfo[field]}
                                        onChange={handleShippingChange}
                                        className="shadow border rounded w-full py-2 px-3"
                                        required
                                    />
                                </div>
                            ))}
                        </form>
                    </div>
                </div>
                <motion.div className="mt-6 text-center" variants={formVariants}>
                    <Link to="/" className="text-indigo-600 hover:underline">Back to Homepage</Link>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default CheckoutPage;
