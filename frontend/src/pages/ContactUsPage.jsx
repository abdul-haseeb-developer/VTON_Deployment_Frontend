import React from 'react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext'; // Import ThemeContext

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

function ContactUsPage() {
  const { theme } = useTheme(); // Use the theme context

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on component mount
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <motion.div
      className={`min-h-screen py-16 px-6 flex justify-center items-center ${
        theme === 'light' ? 'bg-gradient-to-br from-blue-50 to-indigo-100' : 'bg-gradient-to-br from-gray-900 to-gray-800'
      }`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className={`rounded-lg p-8 md:w-3/4 lg:w-1/2 shadow-md ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
        variants={formVariants}
      >
        <h2 className={`text-2xl font-semibold text-center mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          Contact Us
        </h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
              Your Name
            </label>
            <input
              type="text"
              id="name"
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                theme === 'light' ? 'text-gray-700 border-gray-300' : 'text-gray-300 bg-gray-800 border-gray-700'
              }`}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
              Your Email
            </label>
            <input
              type="email"
              id="email"
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                theme === 'light' ? 'text-gray-700 border-gray-300' : 'text-gray-300 bg-gray-800 border-gray-700'
              }`}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="subject" className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                theme === 'light' ? 'text-gray-700 border-gray-300' : 'text-gray-300 bg-gray-800 border-gray-700'
              }`}
              placeholder="Subject of your inquiry"
            />
          </div>
          <div>
            <label htmlFor="message" className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                theme === 'light' ? 'text-gray-700 border-gray-300' : 'text-gray-300 bg-gray-800 border-gray-700'
              }`}
              placeholder="Enter your message"
            ></textarea>
          </div>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            type="submit"
            className={`font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 focus:outline-none focus:shadow-outline ${
              theme === 'light'
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-indigo-400 hover:bg-indigo-500 text-white'
            }`}
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default ContactUsPage;