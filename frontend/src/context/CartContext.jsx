import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(false);

  // Fetch cart from backend after login
  useEffect(() => {
    if (authToken) {
      fetchCart();
    }
  }, [authToken]);

  const fetchCart = async () => {
    try {
      const res = await axios.get('/api/cart', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setCart(res.data.items);
    } catch (err) {
      console.error('Failed to fetch cart:', err.response?.data || err.message);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true); // Set loading state
    try {
      // Check if the item already exists in the cart
      const existingItem = cart.find(item => item.productId._id === productId);

      if (existingItem) {
        // If item exists, update the quantity
        await updateQuantity(productId, existingItem.quantity + quantity);
      } else {
        // If it's a new item, add it
        const res = await axios.post(
          '/api/cart/items',
          { productId, quantity },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        setCart(res.data.items);
      }
    } catch (err) {
      console.error('Add to cart failed:', err.response?.data || err.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const updateQuantity = async (productId, quantity) => {
    setLoading(true); // Set loading state
    try {
      const res = await axios.put(
        `/api/cart/items/${productId}`,
        { quantity },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setCart(res.data.items);
    } catch (err) {
      console.error('Update quantity failed:', err.response?.data || err.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`/api/cart/items/${productId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setCart(res.data.items);
    } catch (err) {
      console.error('Remove from cart failed:', err.response?.data || err.message);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('/api/cart', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setCart([]);
    } catch (err) {
      console.error('Clear cart failed:', err.response?.data || err.message);
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
    fetchCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        authToken,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        handleLogin,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
