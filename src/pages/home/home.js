import './home.css';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ListaProjetos from '../../components/ListaProjetos/listaProjetos';
import PublicacoesSelecionadas from '../../components/PublicacoesSelecionadas/publicacoesSelecionadas';
import { links } from '../../content/perfil';
import { useIdioma } from '../../context/IdiomaContext/idiomaContext';

export default function Home(){
    const profileImage = 'https://www.sunsalesystem.com.br/img/rodrigo-1.png';
    const location = useLocation();
    const { t, c } = useIdioma();
    const apresentacao = c.apresentacao;

    // Rola até a âncora do menu. A lista da API carrega depois e muda a altura
    // da página, então reposiciona enquanto o layout muda (até o usuário rolar ou 4s).
    useEffect(() => {
        if (!location.hash) return;
        const id = location.hash.slice(1);
        const rolar = (behavior) => document.getElementById(id)?.scrollIntoView({ behavior });
        rolar('smooth');

        const observer = new ResizeObserver(() => rolar('auto'));
        observer.observe(document.body);
        const parar = () => observer.disconnect();
        const timer = setTimeout(parar, 4000);
        window.addEventListener('wheel', parar, { once: true });
        window.addEventListener('touchmove', parar, { once: true });
        return () => {
            parar();
            clearTimeout(timer);
            window.removeEventListener('wheel', parar);
            window.removeEventListener('touchmove', parar);
        };
    }, [location]);

    return(
        <main className="pagina home">
            <section className="intro" aria-labelledby="intro-nome">
                <p className="intro-saudacao">{apresentacao.saudacao}</p>
                <div className="intro-cabecalho">
                    <img className="intro-foto" src={profileImage} alt={t.fotoAlt} />
                    <div>
                        <h1 id="intro-nome">{apresentacao.nome}</h1>
                        <p className="intro-linha">{apresentacao.linha}</p>
                    </div>
                </div>
                {apresentacao.paragrafos.map((texto, i) => <p key={i}>{texto}</p>)}
                <p className="intro-links">
                    <Link to="/experiencia">{t.menu.experiencia}</Link>
                    <a href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                    {links.curriculos.map((cv) => (
                        <a key={cv.href} href={cv.href} target="_blank" rel="noopener noreferrer">
                            {t.curriculo} {cv.idioma}
                        </a>
                    ))}
                    <a href={`mailto:${links.email}`}>{links.email}</a>
                </p>
            </section>

            <ListaProjetos/>

            <PublicacoesSelecionadas/>
        </main>
    )
}
