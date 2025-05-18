import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom'; // Import the Link component

function CartPopUp({ product, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    onClose(); // Close the pop-up after adding
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{product.name}</h2>
        <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-md mb-4 mx-auto" />
        <p className="text-gray-600 mb-2">Price: ${product.price}</p>
        <div className="flex items-center justify-center mb-4">
          <button onClick={decrementQuantity} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-l-md">-</button>
          <span className="mx-2">{quantity}</span>
          <button onClick={incrementQuantity} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-r-md">+</button>
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md mr-2">Cancel</button>
          <button onClick={handleAddToCart} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md">Add to Cart</button>
          <Link to="/checkout" onClick={onClose} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md ml-2">Checkout</Link>
        </div>
      </div>
    </div>
  );
}

export default CartPopUp;