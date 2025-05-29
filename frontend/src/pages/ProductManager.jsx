import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './styles/ProductManagerScreen.css';

const ProductManagerScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('https://vton-deployment-2.onrender.com/api/products');
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
    setShowEditForm(false);
    setSelectedProduct(null);
    setFormData({ name: '', price: '', image: '', description: '', category: '' });
    setError(null);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
    setError(null);
  };

  const handleShowEditForm = (product) => {
    setSelectedProduct(product);
    setFormData({ ...product });
    setShowEditForm(true);
    setShowAddForm(false);
    setError(null);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedProduct(null);
    setFormData({ name: '', price: '', image: '', description: '', category: '' });
    setError(null);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/products', formData);
      setProducts([...products, data]);
      handleCloseAddForm();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...updatedFields } = formData;
      const { data } = await axios.put(`/api/products/${_id}`, updatedFields);
      const updatedProducts = products.map((p) => (p._id === data._id ? data : p));
      setProducts(updatedProducts);
      handleCloseEditForm();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        const updatedProducts = products.filter((product) => product._id !== id);
        setProducts(updatedProducts);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const productVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, type: 'spring', stiffness: 100 },
    },
    hover: {
      scale: 1.02,
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
      transition: { duration: 0.2 },
    },
  };

  const formVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, type: 'spring', stiffness: 120 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <motion.div
      className="product-manager-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="main-title">Manage Products</h1>

      <motion.button
        className="add-button"
        onClick={handleShowAddForm}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add New Product
      </motion.button>

      {showAddForm && (
        <motion.div
          className="form-container"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <h2>Add Product</h2>
          <form onSubmit={handleAddProduct}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image URL:</label>
              <input type="text" id="image" name="image" value={formData.image} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} />
            </div>
            <button type="submit" className="submit-button">Add Product</button>
            <button type="button" className="cancel-button" onClick={handleCloseAddForm}>Cancel</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </motion.div>
      )}

      {showEditForm && selectedProduct && (
        <motion.div
          className="form-container"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <h2>Edit Product</h2>
          <form onSubmit={handleUpdateProduct}>
            <input type="hidden" name="_id" value={formData._id} />
            <div className="form-group">
              <label htmlFor="edit-name">Name:</label>
              <input type="text" id="edit-name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="edit-price">Price:</label>
              <input type="number" id="edit-price" name="price" value={formData.price} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="edit-image">Image URL:</label>
              <input type="text" id="edit-image" name="image" value={formData.image} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="edit-description">Description:</label>
              <textarea id="edit-description" name="description" value={formData.description} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="edit-category">Category:</label>
              <input type="text" id="edit-category" name="category" value={formData.category} onChange={handleInputChange} />
            </div>
            <button type="submit" className="submit-button">Update Product</button>
            <button type="button" className="cancel-button" onClick={handleCloseEditForm}>Cancel</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </motion.div>
      )}

      <div className="product-list">
        <h2>Product List</h2>
        {products.map((product) => (
          <motion.div className="product-item" key={product._id} variants={productVariants} whileHover="hover">
            <div className="product-info">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="details">
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
                {product.description && <p className="description">{product.description.substring(0, 50)}...</p>}
              </div>
            </div>
            <div className="actions">
              <motion.button
                className="edit-button"
                onClick={() => handleShowEditForm(product)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Edit
              </motion.button>
              <motion.button
                className="delete-button"
                onClick={() => handleDeleteProduct(product._id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
        {products.length === 0 && !loading && !error && <p>No products available.</p>}
      </div>
    </motion.div>
  );
};

export default ProductManagerScreen;
