import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext'; // Assuming you have a ThemeContext

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { delay: 0.2, duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

const contentVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] } },
};

function AboutUsPage() {
  const { theme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on component mount
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <motion.div
      className={`min-h-screen py-16 px-6 flex justify-center items-center ${
        theme === 'light' ? 'bg-gradient-to-br from-yellow-50 to-orange-100' : 'bg-gradient-to-br from-gray-900 to-gray-800'
      }`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className={`rounded-lg p-8 md:w-3/4 lg:w-1/2 shadow-md ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
        variants={contentVariants}
      >
        <h2 className={`text-3xl font-semibold mb-6 text-center ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          About Our Brand
        </h2>
        <div className={`space-y-4 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
          <p className="text-lg">
            Welcome to VTON! We are passionate about providing high-quality, stylish, and comfortable shirts that empower
            you to express your individuality. Our journey began with a simple idea: to make online clothing shopping an
            enjoyable and confident experience.
          </p>
          <p className="text-lg">
            What sets us apart is our commitment to innovation, particularly our virtual try-on technology. We believe
            that you should be able to see exactly how our shirts will look on you before making a purchase, eliminating
            guesswork and ensuring your satisfaction.
          </p>
          <h3 className={`text-xl font-semibold mt-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            Our Values
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Quality:</strong> We meticulously select fabrics and ensure our shirts are crafted to the highest
              standards.
            </li>
            <li>
              <strong>Innovation:</strong> We continuously strive to improve your shopping experience through technology like
              our virtual try-on.
            </li>
            <li>
              <strong>Customer Satisfaction:</strong> Your happiness is our top priority. We are dedicated to providing
              excellent customer service.
            </li>
            <li>
              <strong>Sustainability:</strong> We are increasingly mindful of our environmental impact and are exploring
              sustainable practices in our sourcing and production.
            </li>
          </ul>
          <h3 className={`text-xl font-semibold mt-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Our Team</h3>
          <p className="text-lg">
            Behind VTON is a dedicated team of designers, technologists, and customer support professionals who are
            passionate about fashion and committed to bringing you the best possible online shopping experience. We
            believe in collaboration, creativity, and a customer-first approach.
          </p>
          <p className="text-lg">
            Thank you for being a part of the VTON community. We are excited to continue serving you and helping you
            discover your perfect style.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AboutUsPage;