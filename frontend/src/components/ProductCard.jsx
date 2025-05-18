import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

const productItemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.02, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)", transition: { duration: 0.3 } },
};

function ProductCard({ product }) {
  return (
    <motion.div className="bg-white rounded-lg shadow-md overflow-hidden" variants={productItemVariants} whileHover="hover">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{product.name}</h3>
        <p className="text-gray-500 mb-3">${product.price}</p>
        <div className="flex space-x-2">
          <motion.button variants={buttonVariants} whileHover="hover" whileTap="tap" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300">Add to Cart</motion.button>
          <motion.Link to="/vton" variants={buttonVariants} whileHover="hover" whileTap="tap" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300">Try On</motion.Link>
          <motion.Link to="/checkout" variants={buttonVariants} whileHover="hover" whileTap="tap" className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300">Buy Now</motion.Link>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;