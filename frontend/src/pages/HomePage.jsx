import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import HowItWorksSection from '../components/HowItWorksSection';
import NewCollectionSection from '../components/NewCollectionSection';
import TrendingProductsSection from '../components/TrendingProductsSection';
import ReviewsSection from '../components/ReviewsSection';
import TeamSection from '../components/TeamSection';
import AboutUsSection from '../components/AboutUsSection';
import FAQSection from '../components/FAQSection';
import CartPopUp from '../components/CartPopUp';
import { useCart } from '../context/CartContext';

import heroImage from '../assets/images/hero-vedio.mp4';
import uploadIcon from '../assets/images/upload-icon.svg';
import tryIcon from '../assets/images/try-icon.svg';
import cartIcon from '../assets/images/cart-icon.svg';
import userAvatar1 from '../assets/images/user-avatar-1.png';
import userAvatar2 from '../assets/images/user-avatar-2.png';
import { teamMembers } from '../data/teamMembersData';

const movingSubContent = ["Discover stylish outfits – shirts, pants & uppers!", "Experience virtual try-on.", "Instantly see what suits you – find your flawless fit with VTON."];

const heroVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] } },
};

const stepVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const productVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const productItemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] } },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const reviewVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] } },
};

const teamVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const teamMemberVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] } },
  hover: { scale: 1.05 },
};

function HomePage() {
  const [currentSubContentIndex, setCurrentSubContentIndex] = useState(0);
  const [newCollection, setNewCollection] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const { addToCart } = useCart();
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setIsPopUpOpen(true);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products'); // Adjust if using proxy or full URL
        const products = response.data;

        // Simple logic: first 4 → trending, rest → newCollection
        setTrendingProducts(products.slice(0, 6));
        setNewCollection(products.slice(6));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubContentIndex((prevIndex) => (prevIndex + 1) % movingSubContent.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen font-sans antialiased">
      <HeroSection
        movingSubContent={movingSubContent}
        currentSubContentIndex={currentSubContentIndex}
        heroImage={heroImage}
        heroVariants={heroVariants}
      />
      <HowItWorksSection
        uploadIcon={uploadIcon}
        tryIcon={tryIcon}
        cartIcon={cartIcon}
        stepVariants={stepVariants}
      />
      <NewCollectionSection
        newCollection={newCollection}
        productVariants={productVariants}
        productItemVariants={productItemVariants}
        buttonVariants={buttonVariants}
        handleAddToCartClick={handleAddToCartClick}
      />
      <TrendingProductsSection
        trendingProducts={trendingProducts}
        productVariants={productVariants}
        productItemVariants={productItemVariants}
        buttonVariants={buttonVariants}
        handleAddToCartClick={handleAddToCartClick}
      />
      <ReviewsSection
        userAvatar1={userAvatar1}
        userAvatar2={userAvatar2}
        reviewVariants={reviewVariants}
      />
      <TeamSection
        teamMembersData={teamMembers}
        teamVariants={teamVariants}
        teamMemberVariants={teamMemberVariants}
      />
      <AboutUsSection />
      <FAQSection />
      {isPopUpOpen && selectedProduct && (
        <CartPopUp product={selectedProduct} onClose={closePopUp} />
      )}
    </div>
  );
}

export default HomePage;
