import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext'; // Assuming you have a ThemeContext

function AboutUsSection() {
  const { theme } = useTheme();

  return (
    <section className={`py-16 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
      <div className="container mx-auto px-6 text-center">
        <h2 className={`text-2xl font-semibold mb-8 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          About Us
        </h2>
        <motion.p
          className={`text-lg mb-6 ${theme === 'light' ? 'text-gray-700' : 'text-gray-400'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          VTON X is revolutionizing the way you shop for shirts online. We believe that finding the perfect fit and style should be easy and enjoyable. Our virtual try-on technology allows you to see exactly how a shirt will look on you before you buy, eliminating guesswork and ensuring your satisfaction.
        </motion.p>
        <motion.p
          className={`text-lg ${theme === 'light' ? 'text-gray-700' : 'text-gray-400'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          We are passionate about providing high-quality apparel and a seamless shopping experience. Our team is dedicated to innovation and customer satisfaction, constantly working to improve our technology and expand our collection.
        </motion.p>
        <Link
          to="/about"
          className={`inline-block font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 mt-8 ${
            theme === 'light' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-700 hover:bg-indigo-800 text-white'
          }`}
        >
          Read More About Us
        </Link>
      </div>
    </section>
  );
}

export default AboutUsSection;