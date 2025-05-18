import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const API_BASE = 'http://localhost:5000'; // Your backend

const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.2, duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
};

const uploadVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const tryOnVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.3 } },
};

const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
};

function VTONPage() {
    const { theme } = useTheme();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productIdFromQuery = queryParams.get('productId');
    const { state } = location;
    const productFromState = state ? state.product : null;

    const [uploadedImage, setUploadedImage] = useState(null);
    const [userImageUrl, setUserImageUrl] = useState(null);
    const [productImageUrl, setProductImageUrl] = useState(null);
    const [productName, setProductName] = useState('');
    const [tryOnResult, setTryOnResult] = useState(null);

    const [uploadingUser, setUploadingUser] = useState(false);
    const [processingVTON, setProcessingVTON] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [productFetchError, setProductFetchError] = useState('');

    const fileInputRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch product details
    useEffect(() => {
        const fetchProductDetails = async (productId) => {
            if (productId) {
                try {
                    const response = await axios.get(`${API_BASE}/api/products/${productId}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                        },
                    });
                    if (response.data) {
                        setProductImageUrl(response.data.image);
                        setProductName(response.data.name);
                        setProductFetchError('');
                    } else {
                        setProductFetchError('Product not found.');
                    }
                } catch (error) {
                    setProductFetchError('Error fetching product.');
                    console.error('Product fetch error:', error);
                }
            } else if (productFromState?.image) {
                setProductImageUrl(productFromState.image);
                setProductName(productFromState.name);
            }
        };

        fetchProductDetails(productIdFromQuery);
    }, [productIdFromQuery, productFromState]);

    const handleImageUpload = async (event) => {
        const file = event.target.files ? event.target.files?.[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(file);

            try {
                setUploadingUser(true);
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'vatonx'); // 🔁 Replace this with your Cloudinary upload preset
                const res = await axios.post(
                    'https://api.cloudinary.com/v1_1/djtzcz3va/image/upload', // 🔁 Replace this with your Cloudinary cloud name
                    formData
                );
                setUserImageUrl(res.data.secure_url);
                setUploadError('');
            } catch (err) {
                console.error('Cloudinary upload failed:', err);
                setUploadError('Failed to upload image. Try again.');
            } finally {
                setUploadingUser(false);
            }
        }
    };

    const triggerFileInput = () => fileInputRef.current.click();

    const handleTryOn = async () => {
        if (!userImageUrl || !productImageUrl) {
            alert('Please upload your image and ensure a product is selected.');
            return;
        }

        try {
            setProcessingVTON(true);
            setTryOnResult('Processing...');
            console.log('Sending VTON request with category:', selectedCategory);

            const response = await axios.post(
                `${API_BASE}/api/vton/process-vton`,
                { productImageUrl, userImageUrl, category: selectedCategory || "lower" },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                }
            );

            if (response.data?.resultImageUrl) {
                setTryOnResult(response.data.resultImageUrl);
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            console.error('Try-on failed:', err);
            setTryOnResult('Error processing try-on.');
        } finally {
            setProcessingVTON(false);
        }
    };

    const [selectedCategory, setSelectedCategory] = useState('upper'); // Default selection

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <motion.div
            className={`min-h-screen py-16 px-6 flex flex-col items-center ${theme === 'light' ? 'bg-gradient-to-br from-pink-50 to-rose-100' : 'bg-gradient-to-br from-gray-900 to-gray-800'
                }`}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <motion.h2 className={`text-3xl font-semibold text-center mb-8 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`} variants={uploadVariants}>
                Virtual Try-On
            </motion.h2>

            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
                {/* Left Side: Product Image and Upload */}
                <div className="md:w-1/2 flex flex-col gap-8">
                    {productImageUrl && (
                        <motion.div className={`shadow-md rounded-lg p-8 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`} variants={uploadVariants}>
                            <p className={`mb-4 font-semibold text-center ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                Product: {productName}
                            </p>
                            <motion.img src={productImageUrl} alt={productName} className="rounded-md w-full h-auto shadow-md" variants={tryOnVariants} style={{ maxHeight: '400px', objectFit: 'contain' }} />
                        </motion.div>
                    )}

                    <motion.div className={`shadow-md rounded-lg p-8 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`} variants={uploadVariants}>
                        <p className={`mb-4 text-center ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                            Upload your image to try this product on
                        </p>
                        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                        <motion.button
                            onClick={triggerFileInput}
                            className={`w-full font-semibold py-3 px-6 rounded-full shadow-md ${theme === 'light' ? 'bg-pink-600 text-white' : 'bg-pink-400 text-white'}`}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            disabled={uploadingUser}
                        >
                            {uploadingUser ? 'Uploading...' : 'Upload Your Image'}
                        </motion.button>

                        {uploadError && <p className="mt-2 text-red-500 font-semibold">{uploadError}</p>}
                        {uploadedImage && (
                            <motion.img src={uploadedImage} alt="User Preview" className="mt-6 w-full rounded shadow" variants={tryOnVariants} style={{ maxHeight: '300px', objectFit: 'contain' }} />
                        )}
                    </motion.div>
                </div>

                {/* Right Side: Try-On Result and Dropdown */}
                <div className="md:w-1/2 flex flex-col items-center justify-center gap-8"> {/* Added gap-8 for spacing between elements on the right side */}
                    {/* Dropdown Menu for Category Selection (Moved Here) */}
                    <motion.div className={`shadow-md rounded-lg p-8 w-full ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`} variants={uploadVariants}>
                        <div className="mt-4">
                            <label htmlFor="category-select" className={`block mb-2 font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-white'}`}>
                                Select the clothing category:
                            </label>
                            <select
                                id="category-select"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className={`block w-full py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
                                    ${theme === 'light'
                                        ? 'bg-gray-50 border-gray-300 text-gray-900'
                                        : 'bg-gray-700 border-gray-600 text-white'
                                    }`}
                            >
                                <option value="upper">Upper</option>
                                <option value="lower">Lower</option>
                                {/* Retaining 'full' value for 'Overall' for backend compatibility */}
                                <option value="overall">Overall</option>
                            </select>
                        </div>
                    </motion.div>

                    {userImageUrl && productImageUrl && (
                        <motion.div className={`shadow-md rounded-lg p-8 w-full ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} flex flex-col items-center justify-center`} variants={uploadVariants}>
                            <motion.button
                                onClick={handleTryOn}
                                className={`font-semibold py-3 px-6 rounded-full shadow-md mb-4 ${theme === 'light' ? 'bg-indigo-600 text-white' : 'bg-indigo-400 text-white'
                                    }`}
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                disabled={processingVTON}
                            >
                                {processingVTON ? 'Trying On...' : 'Try On Now'}
                            </motion.button>

                            {tryOnResult === 'Processing...' && <p className="mt-6 text-indigo-500 font-semibold">{tryOnResult}</p>}
                            {tryOnResult && tryOnResult !== 'Processing...' && tryOnResult !== 'Error processing try-on.' && (
                                <motion.div className="mt-6 w-full">
                                    <img src={tryOnResult} alt="Try-On Result" className="w-full rounded shadow" style={{ maxHeight: '600px', objectFit: 'contain' }} />
                                    <p className={`mt-2 text-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Here's your virtual try-on!</p>
                                </motion.div>
                            )}
                            {tryOnResult === 'Error processing try-on.' && (
                                <p className="mt-6 text-red-500 font-semibold">Something went wrong. Please try again.</p>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default VTONPage;