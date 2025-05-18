import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext'; // Assuming you have a ThemeContext

function ReviewsSection({ userAvatar1, userAvatar2, reviewVariants }) {
  const { theme } = useTheme();

  return (
    <section className={`py-16 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
      <div className="container mx-auto px-6">
        <h2 className={`text-2xl font-semibold text-center mb-8 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          Customer Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sample Review 1 */}
          <motion.div
            className={`rounded-lg shadow-md p-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
            initial="initial"
            animate="animate"
            variants={reviewVariants}
          >
            <div className="flex items-center mb-4">
              <img src={userAvatar2} alt="User 2" className="w-10 h-10 rounded-full mr-3" style={{ filter: theme === 'dark' ? 'brightness(0.9)' : 'none' }} />
              <h4 className={`text-md font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Sarah M.</h4>
            </div>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              "The virtual try-on feature is amazing! I could see exactly how the shirt would fit before buying. Great quality and fast shipping."
            </p>
          </motion.div>
          {/* Sample Review 2 */}
          <motion.div
            className={`rounded-lg shadow-md p-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
            initial="initial"
            animate="animate"
            variants={reviewVariants}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <img src={userAvatar1} alt="User 1" className="w-10 h-10 rounded-full mr-3" style={{ filter: theme === 'dark' ? 'brightness(0.9)' : 'none' }} />
              <h4 className={`text-md font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>John B.</h4>
            </div>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              "Excellent selection of shirts and the website is very user-friendly. The team section is a nice touch, adds a personal feel."
            </p>
          </motion.div>
          {/* Add more reviews here */}
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;