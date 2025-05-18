import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider

// Import your page components
import HomePage from './pages/HomePage';
import VTONPage from './pages/VTONPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactUsPage from './pages/ContactUsPage';
import AboutUsPage from './pages/AboutUsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PaymentPage from './pages/PaymentPage';
import TeamPage from './pages/TeamPage';
import MyBookingPage from './pages/MyBookingPage';
import TeamMemberPage from './pages/TeamMemberPage';
import NotFoundPage from './pages/NotFoundPage';
import OrderSuccess from './pages/OrderSuccess';

// Import the ProductManagerScreen
import ProductManagerScreen from './pages/ProductManager';

// Import your shared components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingCartButton from './components/FloatingCartButton';
import CustomCursor from './components/CustomCursor';
import NavigationProgress from './components/NavigationProgress';

// ===============================
// Main App Component
// ===============================

function App() {
  return (
    <div className="bg-gray-50">
      <Router>
        <CartProvider>
          <ThemeProvider>
            {/* Wrap your app with ThemeProvider */}
            <AppContent />
          </ThemeProvider>
        </CartProvider>
      </Router>
    </div>
  );
}

// ===============================
// App Content Component
// ===============================

function AppContent() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mainContentRef = useRef(null);
  const [contentPadding, setContentPadding] = useState(0);

  // --- Mobile Menu ---
  const handleMobileMenuToggle = (isOpen) => {
    setIsMobileMenuOpen(isOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      const mobileMenuHeight =
        document.querySelector('.mobile-menu')?.offsetHeight || 0;
      setContentPadding(mobileMenuHeight);
    } else {
      setContentPadding(0);
    }
  }, [isMobileMenuOpen]);

  // --- Main Render ---
  return (
    <div className="app-container relative">
      <CustomCursor />
      <Navbar onMobileMenuToggle={handleMobileMenuToggle} />
      <NavigationProgress />
      {/* Render NavigationProgress here, outside of Routes */}
      <div
        className={`main-content ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}
        style={{ paddingTop: contentPadding }}
        ref={mainContentRef}
      >
        <AnimatePresence mode="wait" initial={false}>
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/vton" element={<VTONPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/meeting" element={<MyBookingPage />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/team/:id" element={<TeamMemberPage />} />
            {/* Add the route for ProductManagerScreen */}
            <Route path="/admin/products" element={<ProductManagerScreen />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
      <FloatingCartButton />
    </div>
  );
}

export default App;
