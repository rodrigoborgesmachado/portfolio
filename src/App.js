import RoutesApp from "./routes";
import React, { useContext, useEffect } from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  ThemeContext from './context/ThemeContext/themeContext';

function App() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="App">
      <ToastContainer autoClose="2000"/>
      <RoutesApp/>
    </div>
  );
}

export default App;
