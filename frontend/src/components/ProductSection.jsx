import React from 'react';
import ProductCard from './ProductCard';

// Sample Product Data (replace with data fetched from your backend)
const sampleProducts = [
  { id: 1, name: 'Stylish Blue Shirt', price: 29.99, image: require('../assets/images/shirt1.png') },
  { id: 2, name: 'Elegant White Shirt', price: 35.50, image: require('../assets/images/shirt2.png') },
  // Add more product objects
];

const productVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
};

function ProductSection({ title }) {
  const filteredProducts = title === 'New Collection' ? sampleProducts.slice(0, 3) : sampleProducts.slice(1, 4); // Example filtering

  return (
    <section className="py-16 bg-indigo-50">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">{title}</h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial="initial" animate="animate" variants={productVariants}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ProductSection;