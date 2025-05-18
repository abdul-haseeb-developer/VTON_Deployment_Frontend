import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext'; // Assuming you have a ThemeContext

function HeroSection({ movingSubContent, currentSubContentIndex, heroImage, heroVariants }) {
  const { theme } = useTheme();

  return (
    <motion.section
      className={`py-16 px-6 flex flex-col md:flex-row items-center justify-between ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
      initial="initial"
      animate="animate"
      variants={heroVariants}
    >
      {/* Text Content */}
      <div className="md:w-1/2 w-full text-center md:text-left">
        <motion.h1
          className={`text-4xl font-bold mb-4 hero-heading-vite ${theme === 'light' ? '' : 'text-white'}`}
          variants={heroVariants}
          transition={{ delay: 0.2 }}
        >
          Virtual Try-On for Your Perfect Look
        </motion.h1>
        <motion.p
          className={`text-lg mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
          variants={heroVariants}
          transition={{ delay: 0.4 }}
        >
          {movingSubContent[currentSubContentIndex]}
        </motion.p>
        <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/vton"
            className={`inline-block font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 button-3d ${
              theme === 'light' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-700 hover:bg-indigo-800 text-white'
            }`}
          >
            Try On Now
          </Link>
          <Link
            to="/about"
            className={`inline-block font-semibold py-3 px-6 rounded-full transition duration-300 button-3d ${
              theme === 'light'
                ? 'bg-transparent border-2 border-indigo-600 hover:bg-indigo-50 text-indigo-600'
                : 'bg-transparent border-2 border-indigo-400 hover:bg-indigo-700 text-indigo-400'
            }`}
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Video Content */}
      <motion.div className="md:w-1/2 w-full flex justify-center mt-10 md:mt-0" variants={heroVariants} transition={{ delay: 0.6 }}>
        <video
          src={heroImage}
          alt="Virtual Try On"
          className="rounded-lg shadow-lg w-full max-w-md"
          style={{ filter: theme === 'dark' ? 'brightness(0.9)' : 'none' }}
          autoPlay
          loop
          muted
          playsInline
        />
      </motion.div>
    </motion.section>
  );
}

export default HeroSection;
