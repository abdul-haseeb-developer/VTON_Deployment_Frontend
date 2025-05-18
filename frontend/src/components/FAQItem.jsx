// FAQItem.jsx
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext'; // Assuming you have a ThemeContext
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'; // Optional: For expand/collapse icons

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div className={`mb-4 rounded-md shadow-sm ${theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-900 border border-gray-700'}`}>
      <button
        className={`w-full text-left p-4 flex items-center justify-between font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        {isOpen ? (
          <HiChevronUp className="h-5 w-5 ml-2" />
        ) : (
          <HiChevronDown className="h-5 w-5 ml-2" />
        )}
      </button>
      {isOpen && (
        <div className={`p-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
          {answer}
        </div>
      )}
    </div>
  );
}

export default FAQItem;