import {React, useContext} from 'react';
import ThemeContext from './../../context/ThemeContext/themeContext';
import './ThemeSwitcher.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="change-theme-div">
      <input
        type="radio"
        id="light"
        name="theme"
        value="light"
        checked={theme === 'light'}
        onChange={toggleTheme}
      />
      <label htmlFor="light" className="theme-label">
        <FontAwesomeIcon icon={faSun} className="icon sun" />
      </label>

      <input
        type="radio"
        id="dark"
        name="theme"
        value="dark"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <label htmlFor="dark" className="theme-label">
        <FontAwesomeIcon icon={faMoon} className="icon moon" />
      </label>
    </div>
  );
};

export default ThemeSwitcher;
