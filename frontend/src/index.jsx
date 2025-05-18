import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css'; // Import your global CSS file (e.g., Tailwind CSS)
import { ThemeProvider } from './context/ThemeContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <ThemeProvider>
    <App />
    </ThemeProvider>
  </React.StrictMode>
);