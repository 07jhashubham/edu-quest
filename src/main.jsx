import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import './index.css';
import { Web3Provider } from './context/context';  // Import the Web3Provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Web3Provider>  {/* Wrap App with Web3Provider */}
      <App />
    </Web3Provider>
  </StrictMode>
);
