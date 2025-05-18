import React, { useState, useEffect } from 'react';
import './NavigationProgress.css';
import { useTheme } from '../context/ThemeContext';

function NavigationProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const scrolled = (scrollTop / (documentHeight - windowHeight)) * 100;
      const percentage = Math.min(100, Math.max(0, scrolled));
      setScrollPercentage(percentage);
      setIsVisible(percentage < 100); // Hide when 100%
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isVisible ? (
    <div className={`navigation-progress-popup ${theme}`}>
      <div
        className="progress-bar"
        style={{ width: `${scrollPercentage}%` }}
      >
        <span className="progress-text">{Math.round(scrollPercentage)}%</span>
      </div>
    </div>
  ) : null;
}

export default NavigationProgress;