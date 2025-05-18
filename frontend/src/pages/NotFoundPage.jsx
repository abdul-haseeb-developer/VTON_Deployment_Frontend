import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext'; // Assuming you have a ThemeContext

const notFoundVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: 'easeInOut' } },
};

function NotFoundPage() {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`flex flex-col items-center justify-center h-screen px-6 ${
        theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-900 text-gray-200'
      }`}
      variants={notFoundVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.h1
        className="text-6xl font-bold mb-4"
        style={{ color: theme === 'light' ? '#646cff' : '#c678dd' }} // Use primary theme color
        variants={{
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4, ease: 'easeOut' } },
        }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-xl mb-8 text-center"
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.4, ease: 'easeOut' } },
        }}
      >
        Oops! The page you're looking for could not be found.
      </motion.p>
      <Link to="/">
       < motion.div className={`inline-block font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 ${
          theme === 'light' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-700 hover:bg-indigo-800 text-white'
        }`}
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { delay: 0.6, duration: 0.3, ease: 'easeOut' } },
        }}
      >
        Go back to the homepage
      </motion.div>
      </Link>
    </motion.div>
  );
}

export default NotFoundPage;