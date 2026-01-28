import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";
import ReadmeComponent from "../../components/ReadmeComponent/readmeComponet";
import PacmanLoader from "../../components/PacmanLoader/PacmanLoader";

export default function Repositorio({}){
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
    
    function formatDate(dateString) {
        const date = new Date(dateString);
    
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`;
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
        <div className="projeto-full">
            <div className='projeto-header'>
                <button className='voltar-link' type='button' onClick={() => navigate(-1)}>
                    Voltar
                </button>
                <div className='projeto-actions'>
                    {externalLink ? (
                        <a
                            className='projeto-cta projeto-cta--primary'
                            target='_blank'
                            rel='noopener noreferrer'
                            href={externalLink}
                            title='Abre em nova aba'
                        >
                            Abrir <span aria-hidden='true'>(↗)</span>
                        </a>
                    ) : null}
                    {showRepoLink ? (
                        <a
                            className='projeto-cta projeto-cta--secondary'
                            target='_blank'
                            rel='noopener noreferrer'
                            href={repoLink}
                            title='Abre em nova aba'
                        >
                            Ver c?digo <span aria-hidden='true'>(↗)</span>
                        </a>
                    ) : null}
                </div>
            </div>
            
            <ReadmeComponent info={repositorio.descricao}/>
            <div className='projeto-link'>
                <h4>
                    Criado em {formatDate(repositorio.created)}
                </h4>
            </div>

            <div className='projeto-link'>
                <h4>
                    Acesse: <a target='_blank' rel='noopener noreferrer' title='Abre em nova aba' href={repositorio.link}>Abrir <span aria-hidden='true'>(↗)</span></a>
                </h4>
            </div>
            
            <div className='enviarFeedBack'>
                <a onClick={() => enviarFeedBack(repositorio.titulo)}>Enviar FeedBack</a>
            </div>
        </div>
    )
}