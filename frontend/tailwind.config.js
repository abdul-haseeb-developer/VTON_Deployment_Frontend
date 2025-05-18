/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode based on the 'dark' class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your existing colors (replace with your actual values)
        primary: '#3498db',
        secondary: '#2c3e50',
        accent: '#f39c12',

        // Dark theme specific colors (adjust these to your preference)
        darkBg: '#1a202c',         // Dark background
        darkText: '#f7fafc',       // Light text
        darkPrimary: '#64b5f6',    // Lighter primary for dark mode
        darkSecondary: '#4a5568',  // Lighter secondary for dark mode
        darkAccent: '#f5cd89',     // Lighter accent for dark mode
        darkCard: '#2d3748',        // Darker card background
        darkBorder: '#4a5568',      // Dark border
      },
    },
  },
  plugins: [],
};