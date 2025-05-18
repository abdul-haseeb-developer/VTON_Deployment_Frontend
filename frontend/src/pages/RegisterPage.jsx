import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext'; // Import CartContext for handleLogin

const API_BASE = 'http://localhost:5000'; // Define API base URL

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

function RegisterPage() {
  const { theme } = useTheme();
  const { handleLogin } = useCart(); // Use handleLogin from CartContext
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, { // Use API_BASE
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
        localStorage.setItem('authToken', data.token); // Store the token
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user info (if provided)
        handleLogin(data.token); // Update cart context with the token
        setSuccess(true);
        setTimeout(() => navigate('/'), 1500); // Redirect after a short delay
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <motion.div
      className={`min-h-screen py-16 px-6 flex justify-center items-center ${
        theme === 'light' ? 'bg-gradient-to-br from-purple-100 to-pink-200' : 'bg-gradient-to-br from-gray-900 to-gray-800'
      }`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className={`rounded-lg p-8 md:w-3/4 lg:w-1/3 shadow-md ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
        variants={formVariants}
      >
        <h2 className={`text-2xl font-semibold text-center mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          Register
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">Registration successful! Redirecting...</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                theme === 'light' ? 'text-gray-700 border-gray-300' : 'text-gray-300 bg-gray-800 border-gray-700'
              }`}
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                theme === 'light' ? 'text-gray-700 border-gray-300' : 'text-gray-300 bg-gray-800 border-gray-700'
              }`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                theme === 'light' ? 'text-gray-700 border-gray-300' : 'text-gray-300 bg-gray-800 border-gray-700'
              }`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                theme === 'light' ? 'text-gray-700 border-gray-300' : 'text-gray-300 bg-gray-800 border-gray-700'
              }`}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            type="submit"
            className={`font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 w-full focus:outline-none focus:shadow-outline ${
              theme === 'light'
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-purple-400 hover:purple-500 text-white'
            }`}
          >
            Register
          </motion.button>
        </form>
        <p className={`mt-4 text-sm text-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
          Already have an account?{' '}
          <Link to="/login" className={`${theme === 'light' ? 'text-purple-600 hover:underline' : 'text-purple-400 hover:underline'}`}>
            Log in here
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}

export default RegisterPage;