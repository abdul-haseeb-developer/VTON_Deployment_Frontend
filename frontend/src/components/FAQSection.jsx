import React from 'react';
import FAQItem from './FAQItem'; // Ensure the path to FAQItem.jsx is correct
import { useTheme } from '../context/ThemeContext'; // Assuming you have a ThemeContext

function FAQSection() {
  const { theme } = useTheme();
  const faqs = [
    {
      question: 'What is virtual try-on?',
      answer: 'Virtual try-on allows you to see how a garment would look on you by using your uploaded photo and our advanced technology.',
    },
    {
      question: 'How do I upload my image for the virtual try-on?',
      answer: 'On the virtual try-on page, you will find an upload button where you can select an image from your device.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards (Visa, Mastercard, American Express) and PayPal.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unworn items with tags attached. Please see our full return policy page for details.',
    },
  ];

  return (
    <section className={`py-16 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
      <div className="container mx-auto px-6">
        <h2 className={`text-2xl font-semibold text-center mb-8 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          Frequently Asked Questions
        </h2>
        <div className="lg:w-3/4 mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;