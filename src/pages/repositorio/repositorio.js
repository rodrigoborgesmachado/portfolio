import '../projeto/projeto.css';
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";
import ReadmeComponent from "../../components/ReadmeComponent/readmeComponet";
import PacmanLoader from "../../components/PacmanLoader/PacmanLoader";
import { useIdioma } from '../../context/IdiomaContext/idiomaContext';

export default function Repositorio(){
    const { t: textos, campo, formatarData } = useIdioma();
    const t = textos.projeto;
    const navigate = useNavigate();
    const[repositorio, setRepositorio] = useState({});
    const{id} = useParams();
    const[loadding, setLoadding] = useState(true);

    useEffect(() => {
        buscaRepositorio(true);
    }, [])

    function buscaRepositorio(top){
        api.get('/GitRepositories?page=1&quantity=1&id=' + id)
        .then(response => {
            if(top)
                window.scrollTo(0, 0);
            setRepositorio(response.data.object[0]);
            setLoadding(false);
        })
    }
    
    function enviarFeedBack(titulo){
        localStorage.setItem('Assunto', titulo);
        navigate(`/contatos/assuntos`, {replace: true});
    }

    const externalLink = repositorio?.link;
    const repoLink = repositorio?.linkRepositorio || repositorio?.repositorio || repositorio?.repo || repositorio?.github || repositorio?.repository;
    const showRepoLink = repoLink && repoLink !== externalLink;

    if(loadding){
        return(
            <PacmanLoader/>
        )
    }

    return(
        <main className="pagina detalhe">
            <button className='detalhe-voltar' type='button' onClick={() => navigate(-1)}>
                <span aria-hidden="true">←</span> {t.voltar}
            </button>

            <h1>{campo(repositorio, 'titulo')}</h1>
            <p className="detalhe-meta">{t.criadoEm} {formatarData(repositorio.created)}</p>

            {(externalLink || showRepoLink) && (
                <div className="detalhe-acoes">
                    {externalLink && (
                        <a className="btn btn-primary" target='_blank' rel='noopener noreferrer' href={externalLink} title={textos.abreNovaAba}>
                            {t.abrir} <span aria-hidden='true'>{'↗︎'}</span>
                        </a>
                    )}
                    {showRepoLink && (
                        <a target='_blank' rel='noopener noreferrer' href={repoLink} title={textos.abreNovaAba}>{t.verCodigo}</a>
                    )}
                </div>
            )}

            <div className="detalhe-texto detalhe-texto-readme">
                <ReadmeComponent info={campo(repositorio, 'descricao')}/>
            </div>

            <div className="detalhe-rodape">
                <button type="button" className="detalhe-feedback" onClick={() => enviarFeedBack(repositorio.titulo)}>
                    {t.enviarFeedback}
                </button>
            </div>
        </main>
    )
}
