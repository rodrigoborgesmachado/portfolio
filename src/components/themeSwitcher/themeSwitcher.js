import { useContext } from 'react';
import ThemeContext from './../../context/ThemeContext/themeContext';
import { useIdioma } from '../../context/IdiomaContext/idiomaContext';
import './ThemeSwitcher.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { idioma } = useIdioma();
  const escuro = theme === 'dark';
  const rotulo = idioma === 'en'
    ? (escuro ? 'Switch to light theme' : 'Switch to dark theme')
    : (escuro ? 'Mudar para tema claro' : 'Mudar para tema escuro');

  return (
    <button type="button" className="tema-botao" onClick={toggleTheme} aria-label={rotulo} title={rotulo}>
      <FontAwesomeIcon icon={escuro ? faSun : faMoon} />
    </button>
  );
};

export default ThemeSwitcher;
