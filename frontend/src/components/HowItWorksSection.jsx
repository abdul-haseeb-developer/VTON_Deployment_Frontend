import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext'; // Assuming you have a ThemeContext

function HowItWorksSection({ uploadIcon, tryIcon, cartIcon, stepVariants }) {
  const { theme } = useTheme();

  return (
    <section className={`py-12 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
      <div className="container mx-auto px-6 text-center">
        <h2 className={`text-2xl font-semibold mb-8 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
          <motion.div
            className={`p-6 rounded-lg shadow-md ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
            variants={stepVariants}
            transition={{ delay: 0.2 }}
          >
            <img
              src={tryIcon}
              alt="Select a Shirt"
              className="w-12 h-12 mx-auto mb-4"
              style={{ filter: theme === 'dark' ? 'brightness(0.9)' : 'none' }}
            />
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>
              1. Select a Shirt
            </h3>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Browse our collection and choose the shirt you want to try.
            </p>
          </motion.div>
          <motion.div
            className={`p-6 rounded-lg shadow-md ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
            variants={stepVariants}
          >
            <img
              src={uploadIcon}
              alt="Upload Your Photo"
              className="w-12 h-12 mx-auto mb-4"
              style={{ filter: theme === 'dark' ? 'brightness(0.9)' : 'none' }}
            />
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'}`}>
              2. Upload Your Photo
            </h3>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Easily upload a clear photo of yourself.
            </p>
          </motion.div>
          <motion.div
            className={`p-6 rounded-lg shadow-md ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
            variants={stepVariants}
            transition={{ delay: 0.4 }}
          >
            <img
              src={cartIcon}
              alt="See the Magic"
              className="w-12 h-12 mx-auto mb-4"
              style={{ filter: theme === 'dark' ? 'brightness(0.9)' : 'none' }}
            />
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-green-600' : 'text-green-400'}`}>
              3. See the Magic
            </h3>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Instantly see how the shirt looks on you with our virtual try-on technology.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;