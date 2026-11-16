import './experiencia.css';
import { useEffect } from 'react';
import { links } from '../../content/perfil';
import { useIdioma } from '../../context/IdiomaContext/idiomaContext';

export default function Experiencia(){
    const { t, c } = useIdioma();

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return(
        <main className="pagina experiencia">
            <h1>{t.experienciaTitulo}</h1>
            <p className="experiencia-intro">
                {t.experienciaIntro}{' '}
                {links.curriculos.map((cv, i) => (
                    <span key={cv.href}>
                        {i > 0 && ' / '}
                        <a href={cv.href} target="_blank" rel="noopener noreferrer">{cv.idioma}</a>
                    </span>
                ))}
            </p>
            <ol className="experiencia-lista">
                {c.experiencias.map((exp) => (
                    <li className="experiencia-item" key={exp.empresa}>
                        <p className="experiencia-periodo">{exp.periodo}</p>
                        <div>
                            <h2>
                                {exp.empresa}
                                {exp.cliente && <span className="experiencia-cliente">, {t.cliente} {exp.cliente}</span>}
                            </h2>
                            <p className="experiencia-cargo">{exp.cargo}</p>
                            <ul className="experiencia-itens">
                                {exp.itens.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                            <p className="experiencia-tecnologias">{exp.tecnologias.join(', ')}</p>
                        </div>
                    </li>
                ))}
            </ol>
        </main>
    )
}
