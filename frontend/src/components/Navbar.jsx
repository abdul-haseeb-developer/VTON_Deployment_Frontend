import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { HiMoon, HiSun } from 'react-icons/hi';
import { FaBars, FaTimes } from 'react-icons/fa'; // For mobile menu icons
import { useCart } from '../context/CartContext'; // Import useCart

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const { cart } = useCart(); // Use cart context for count

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
        if (token) {
            fetch('http://localhost:5000/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => {
                if (!response.ok) {
                    console.error(`Error fetching user data: ${response.status}`);
                    setIsLoggedIn(false);
                    setUserName('');
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('userName');
                    return null;
                }
                return response.json();
            })
            .then(data => {
                if (data && data.name) {
                    setUserName(data.name);
                    localStorage.setItem('userName', data.name);
                }
            })
            .catch(error => console.error("Error fetching user data:", error));
        } else {
            setIsLoggedIn(false);
            setUserName('');
        }
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        setUserName('');
        setIsLoggedIn(false);
        navigate('/login');
        closeMobileMenu();
        // Optionally call a backend logout endpoint
    };

    return (
        <nav className={`py-3 fixed top-0 left-0 w-full z-30 ${theme === 'light' ? 'bg-white shadow-md' : 'bg-gray-900 shadow-dark'}`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Mobile View Changes */}
                <div className="md:hidden z-20 flex items-center justify-between w-full">
                    {/* Logo (appears where username was) */}
                    <Link to="/" className={`text-xl font-bold ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'} z-20`}>
                        VTON X
                    </Link>
                    <div className="flex items-center">
                        {/* Username (left of hamburger) */}
                        {isLoggedIn && userName && (
                            <span className={`mr-3 font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{userName}</span>
                        )}
                        {/* Hamburger Button (appears where logo was) */}
                        <button
                            onClick={toggleMobileMenu}
                            className={`focus:outline-none ${theme === 'light' ? 'text-gray-600 hover:text-indigo-600' : 'text-gray-300 hover:text-indigo-400'}`}
                        >
                            {isMobileMenuOpen ? (
                                <FaTimes className="h-6 w-6 fill-current" />
                            ) : (
                                <FaBars className="h-6 w-6 fill-current" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Logo (Desktop - remains unchanged) */}
                <Link to="/" className={`hidden md:block text-xl font-bold ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'} z-20`}>
                    VTON X
                </Link>

                {/* Desktop Navigation Links (remains unchanged) */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/" className={`transition duration-300 ${theme === 'light' ? 'text-gray-700 hover:text-indigo-600' : 'text-gray-300 hover:text-indigo-400'}`}>
                        Home
                    </Link>
                   
                    <Link to="/contact" className={`transition duration-300 ${theme === 'light' ? 'text-gray-700 hover:text-indigo-600' : 'text-gray-300 hover:text-indigo-400'}`}>
                        Contact Us
                    </Link>
                    <Link to="/meeting" className={`transition duration-300 ${theme === 'light' ? 'text-gray-700 hover:text-indigo-600' : 'text-gray-300 hover:text-indigo-400'}`}>
                        Book a Meeting
                    </Link>
                    <Link to="/about" className={`transition duration-300 ${theme === 'light' ? 'text-gray-700 hover:text-indigo-600' : 'text-gray-300 hover:text-indigo-400'}`}>
                        About Us
                    </Link>
                    {isLoggedIn && userName && (
                        <span className={`font-semibold ${theme === 'light' ? 'text-gray-700 mr-4' : 'text-gray-300 mr-4'}`}>{userName}</span>
                    )}
                    {/* Cart Icon with Count */}
                    <Link to="/checkout" className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`h-6 w-6 ${theme === 'light' ? 'text-gray-700 hover:text-indigo-600' : 'text-gray-300 hover:text-indigo-400'}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3a3 3 0 013-3h11.25m-4-8l2.25 8m-6-4h10.906c.587 0 1.059.405 1.175.946l.522 2.088m-6.625-5.5l-.17-.68c-.24-.96-.938-1.65-1.82-1.65h-3.218a.906.906 0 00-.903.906l.825 3.301" />
                        </svg>
                        {cart.length > 0 && (
                            <span className={`absolute top-[-8px] right-[-8px] bg-indigo-500 text-white rounded-full text-xs px-2 font-semibold`}>
                                {cart.length}
                            </span>
                        )}
                    </Link>
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className={`transition duration-300 ${theme === 'light' ? 'text-gray-700 hover:text-red-500 ml-4' : 'text-gray-300 hover:text-red-400 ml-4'}`}>
                            Sign Out
                        </button>
                    ) : (
                        <Link to="/login" className={`transition duration-300 ${theme === 'light' ? 'text-gray-700 hover:text-indigo-600 ml-4' : 'text-gray-300 hover:text-indigo-400 ml-4'}`}>
                            Login
                        </Link>
                    )}
                    {/* Theme Toggle (Desktop) */}
                    <button onClick={toggleTheme} className="focus:outline-none ml-4">
                        {theme === 'light' ? <HiMoon className="h-5 w-5 text-gray-700" /> : <HiSun className="h-5 w-5 text-yellow-500" />}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div
                    className={`absolute top-full left-0 w-full z-10 mobile-menu open ${theme === 'light' ? 'bg-white shadow-md' : 'bg-gray-900 shadow-dark'}`}
                >
                    <div className="px-6 py-4 flex flex-col space-y-4">
                        <Link to="/" onClick={closeMobileMenu} className={`transition duration-300 ${theme === 'light' ? 'text-gray-700 hover:text-indigo-600' : 'text-gray-300 hover:text-indigo-400'}`}>
                            Home
                        </Link>
                        
                        <Link to="/contact" onClick={closeMobileMenu} className={`transition duration-300 ${theme === 'light' ? 'text-gray-700 hover:text-indigo-600' : 'text-gray-300 hover:text-indigo-400'}`}>
                            Contact Us
                        </Link>
                        <Link to="/meeting" onClick={closeMobileMenu} className={`transition duration-300 ${theme === 'light' ? 'text-gray-700 hover:text-indigo-600' : 'text-gray-300 hover:text-indigo-400'}`}>
                            Book a Meeting
                        </Link>
                        <Link to="/about" onClick={closeMobileMenu} className={`transition duration-300 ${theme === 'light' ? 'text-gray-700 hover:text-indigo-600' : 'text-gray-300 hover:text-indigo-400'}`}>
                            About Us
                        </Link>
                        {/* Conditionally render Login/Sign Out in mobile menu */}
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className={`transition duration-300 text-left ${theme === 'light' ? 'text-gray-700 hover:text-red-500' : 'text-gray-300 hover:text-red-400'}`}>
                                Sign Out
                            </button>
                        ) : (
                            <Link to="/login" onClick={closeMobileMenu} className={`transition duration-300 ${theme === 'light' ? 'text-gray-700 hover:text-indigo-600' : 'text-gray-300 hover:text-indigo-400'}`}>
                                Login
                            </Link>
                        )}
                        {/* Theme Toggle (Mobile) */}
                        <button onClick={toggleTheme} className="focus:outline-none mt-4">
                            {theme === 'light' ? <HiMoon className="h-5 w-5 text-gray-700" /> : <HiSun className="h-5 w-5 text-yellow-500" />}
                        </button>
                        {/* Cart Link (Mobile) */}
                        <Link to="/checkout" onClick={closeMobileMenu} className="relative mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`h-6 w-6 ${theme === 'light' ? 'text-gray-700 hover:text-indigo-600' : 'text-gray-300 hover:text-indigo-400'}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3a3 3 0 013-3h11.25m-4-8l2.25 8m-6-4h10.906c.587 0 1.059.405 1.175.946l.522 2.088m-6.625-5.5l-.17-.68c-.24-.96-.938-1.65-1.82-1.65h-3.218a.906.906 0 00-.903.906l.825 3.301" />
                            </svg>
                            {cart.length > 0 && (
                                <span className={`absolute top-[-8px] right-[-8px] bg-indigo-500 text-white rounded-full text-xs px-2 font-semibold`}>
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;