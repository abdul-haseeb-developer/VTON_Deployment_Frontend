import React, { useState, useEffect } from 'react';
import './CustomCursor.css'; // Create a CSS file for custom cursor styles

function CustomCursor() {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('interactive-element')) {
        setIsInteractive(true);
      } else {
        setIsInteractive(false);
      }
    };

    const handleMouseOut = () => {
      setIsInteractive(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isInteractive ? 'interactive' : ''}`}
      style={{
        left: `${cursorX}px`,
        top: `${cursorY}px`,
      }}
    />
  );
}

export default CustomCursor;