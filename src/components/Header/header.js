import ThemeSwitcher from "../themeSwitcher/themeSwitcher"
import { Link, NavLink } from 'react-router-dom';
import { useIdioma } from '../../context/IdiomaContext/idiomaContext';

import './header.css'

export default function Header(){
    const { idioma, setIdioma, t } = useIdioma();

    return(
        <header className="navBar">
            <Link className="navBar-nome" to="/">Rodrigo Machado</Link>
            <nav className="navBar-options" aria-label="Menu">
                <Link className="navBar-link" to="/#projetos">{t.menu.projetos}</Link>
                <NavLink className="navBar-link" to="/experiencia">{t.menu.experiencia}</NavLink>
                <NavLink className="navBar-link" to="/contatos">{t.menu.contato}</NavLink>
                <span className="navBar-idioma" role="group" aria-label={t.idiomaRotulo}>
                    {['pt', 'en'].map((op, i) => (
                        <span key={op}>
                            {i > 0 && <span aria-hidden="true" className="navBar-barra">/</span>}
                            <button
                                type="button"
                                lang={op === 'en' ? 'en' : 'pt-BR'}
                                aria-pressed={idioma === op}
                                className={idioma === op ? 'ativo' : ''}
                                onClick={() => setIdioma(op)}
                            >
                                {op.toUpperCase()}
                            </button>
                        </span>
                    ))}
                </span>
                <ThemeSwitcher/>
            </nav>
        </header>
    )
}
