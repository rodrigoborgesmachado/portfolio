import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ThemeProvider} from './context/ThemeContext/themeContext';
import {IdiomaProvider} from './context/IdiomaContext/idiomaContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <ThemeProvider>
    <IdiomaProvider>
      <App />
    </IdiomaProvider>
  </ThemeProvider>
);
