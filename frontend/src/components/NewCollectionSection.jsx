import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

function NewCollectionSection({
  newCollection,
  productVariants,
  productItemVariants,
  buttonVariants,
  handleAddToCartClick,
}) {
  const { theme } = useTheme();

  return (
    <section className={`py-16 ${theme === 'light' ? 'bg-indigo-50' : 'bg-gray-800'}`}>
      <div className="container mx-auto px-6">
        <h2
          className={`text-2xl font-semibold text-center mb-8 ${
            theme === 'light' ? 'text-gray-800' : 'text-white'
          }`}
        >
          New Collection
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="initial"
          animate="animate"
          variants={productVariants}
        >
          {newCollection.map((product) => {
            const productId = product._id;
            if (!productId) {
              console.warn('Missing product._id for product:', product);
              return null;
            }

            return (
              <motion.div
                key={productId}
                className={`rounded-lg shadow-md overflow-hidden ${
                  theme === 'light' ? 'bg-white' : 'bg-gray-900'
                }`}
                variants={productItemVariants}
                whileHover="hover"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                  style={{ filter: theme === 'dark' ? 'brightness(0.8)' : 'none' }}
                />
                <div className="p-4">
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                    }`}
                  >
                    {product.name}
                  </h3>
                  <p
                    className={`mb-3 ${
                      theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                    }`}
                  >
                    ${product.price}
                  </p>
                  <div className="flex space-x-2">
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className={`font-semibold py-2 px-4 rounded-full transition duration-300 ${
                        theme === 'light'
                          ? 'bg-blue-500 hover:bg-blue-600 text-white'
                          : 'bg-blue-700 hover:bg-blue-800 text-white'
                      }`}
                      onClick={() => handleAddToCartClick(product)}
                    >
                      Add to Cart
                    </motion.button>

                    <Link to={`/vton?productId=${productId}`}>
  <motion.div
    variants={buttonVariants}
    whileHover="hover"
    whileTap="tap"
    className={`font-semibold py-2 px-4 rounded-full transition duration-300 ${
      theme === 'light'
        ? 'bg-green-500 hover:bg-green-600 text-white'
        : 'bg-green-700 hover:bg-green-800 text-white'
    }`}
  >
    Try On
  </motion.div>
</Link>


                    <Link to={`/checkout?productId=${productId}`}>
                      <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className={`font-semibold py-2 px-4 rounded-full transition duration-300 ${
                          theme === 'light'
                            ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                            : 'bg-yellow-700 hover:bg-yellow-800 text-white'
                        }`}
                      >
                        Buy Now
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default NewCollectionSection;
