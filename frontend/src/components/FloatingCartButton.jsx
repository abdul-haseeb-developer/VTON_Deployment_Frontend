import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa'; // Assuming you have react-icons installed

function FloatingCartButton() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link to="/checkout" className="fixed bottom-20 right-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg p-4 z-50">
      <div className="relative">
        <FaShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
            {totalItems}
          </span>
        )}
      </div>
    </Link>
  );
}

export default FloatingCartButton;