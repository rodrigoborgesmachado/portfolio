import './listaProjetos.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import PacmanLoader from '../PacmanLoader/PacmanLoader';
import { useIdioma } from '../../context/IdiomaContext/idiomaContext';

const semTags = (html) => (html || '').replace(/<[^>]+>/g, '').trim();
const POR_PAGINA = 6;

// Lista em linhas das postagens da API.
// tipo: 'Featured_Projects' (projetos) ou 'Articles' (publicações).
// pagina: true quando é o conteúdo principal da página (título vira h1).
export default function ListaProjetos({ tipo = 'Featured_Projects', pagina = false }){
    const { t, campo } = useIdioma();
    const [itens, setItens] = useState(null);
    const [pagina_, setPagina] = useState(1);
    const total = itens ? itens.length : 0;
    const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));
    const visiveis = itens ? itens.slice((pagina_ - 1) * POR_PAGINA, pagina_ * POR_PAGINA) : [];

    function irPara(n){
        setPagina(n);
        document.getElementById(ehArtigo ? 'publicacoes' : 'projetos')?.scrollIntoView({ behavior: 'smooth' });
    }
    const ehArtigo = tipo === 'Articles';
    const titulo = ehArtigo ? t.publicacoes : t.projetosTitulo;
    const Titulo = pagina ? 'h1' : 'h2';
    const idTitulo = `lista-${tipo}`;

    useEffect(() => {
        if (pagina) window.scrollTo(0, 0);
        api.get(`/Postagem/pagged?page=1&quantity=200&tipoPostagem=${tipo}`)
            .then(response => setItens(response.data.object || []))
            .catch(() => setItens([]));
    }, [tipo, pagina]);

    return(
        <section className={`projetos${pagina ? ' projetos-pagina' : ''}`} id={ehArtigo ? 'publicacoes' : 'projetos'} aria-labelledby={idTitulo}>
            <Titulo id={idTitulo} className="projetos-titulo">
                {titulo}
                {itens && itens.length > 0 && <span className="projetos-total">{itens.length}</span>}
            </Titulo>

            {itens === null ? <PacmanLoader/> : (
                <>
                <ul className="projetos-lista">
                    {visiveis.map((p) => (
                        <li key={p.id} className="projeto-linha">
                            <Link to={`/projeto/${p.id}`} className="projeto-logo" tabIndex={-1} aria-hidden="true">
                                {p.capa ? <img src={p.capa} alt="" loading="lazy" /> : <span>{t.semImagem}</span>}
                            </Link>
                            <div className="projeto-texto">
                                <h3><Link to={`/projeto/${p.id}`}>{campo(p, 'titulo')}</Link></h3>
                                <p>{semTags(campo(p, 'intro'))}</p>
                            </div>
                            <div className="projeto-meta">
                                <span>{new Date(p.created).getFullYear()}</span>
                                {p.link && (
                                    <a href={p.link} target="_blank" rel="noopener noreferrer" title={t.abreNovaAba}>
                                        {ehArtigo ? t.linkArtigo : t.verSite} <span aria-hidden="true">{'↗︎'}</span>
                                    </a>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
                {totalPaginas > 1 && (
                    <nav className="paginas" aria-label={t.paginacao}>
                        <button type="button" onClick={() => irPara(pagina_ - 1)} disabled={pagina_ === 1}>
                            <span aria-hidden="true">←</span> {t.anterior}
                        </button>
                        <ol>
                            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                                <li key={n}>
                                    <button
                                        type="button"
                                        onClick={() => irPara(n)}
                                        aria-current={n === pagina_ ? 'page' : undefined}
                                        aria-label={`${t.pagina} ${n}`}
                                    >
                                        {n}
                                    </button>
                                </li>
                            ))}
                        </ol>
                        <button type="button" onClick={() => irPara(pagina_ + 1)} disabled={pagina_ === totalPaginas}>
                            {t.proxima} <span aria-hidden="true">→</span>
                        </button>
                    </nav>
                )}
                </>
            )}
        </section>
    )
}
