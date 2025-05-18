import React from 'react';
import { Link } from 'react-router-dom';
import visaImage from '../assets/images/payment-visa.png';
import mastercardImage from '../assets/images/payment-mastercard.png';
import paypalImage from '../assets/images/payment-paypal.png';
import { useTheme } from '../context/ThemeContext'; // Assuming you have a ThemeContext

function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <footer className={`py-6 ${theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-gray-800 text-gray-300'}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className={`text-lg font-semibold mb-3 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              Information
            </h3>
            <ul className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              <li className="mb-1">
                <Link to="/about" className={`hover:${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  About Us
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/contact" className={`hover:${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Contact Us
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/privacy" className={`hover:${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/terms" className={`hover:${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={`text-lg font-semibold mb-3 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              Customer Service
            </h3>
            <ul className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              <li className="mb-1">
                <Link to="/faq" className={`hover:${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  FAQs
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/shipping" className={`hover:${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Shipping &amp; Delivery
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/returns" className={`hover:${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Returns &amp; Exchanges
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/track-order" className={`hover:${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={`text-lg font-semibold mb-3 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              Connect With Us
            </h3>
            <ul className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              <li className="mb-1">
                <a
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
                >
                  Facebook
                </a>
              </li>
              <li className="mb-1">
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
                >
                  Twitter
                </a>
              </li>
              <li className="mb-1">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
                >
                  Instagram
                </a>
              </li>
              <li className="mb-1">
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={`text-lg font-semibold mb-3 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              Secure Payment
            </h3>
            <div className="flex items-center">
              <img
                src={visaImage}
                alt="Visa"
                className="h-7 mr-2"
                style={{ filter: theme === 'dark' ? 'brightness(0.9)' : 'none' }}
              />
              <img
                src={mastercardImage}
                alt="Mastercard"
                className="h-7 mr-2"
                style={{ filter: theme === 'dark' ? 'brightness(0.9)' : 'none' }}
              />
              <img
                src={paypalImage}
                alt="PayPal"
                className="h-7 mr-2"
                style={{ filter: theme === 'dark' ? 'brightness(0.9)' : 'none' }}
              />
              {/* Add more payment icons as needed */}
            </div>
          </div>
        </div>
        <div className={`mt-6 border-t ${theme === 'light' ? 'border-gray-300' : 'border-gray-700'} py-3 text-center text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
          <p>&copy; {currentYear} VTON. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;