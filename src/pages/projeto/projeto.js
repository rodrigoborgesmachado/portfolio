import './projeto.css';
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";
import DownloadIcon from '@mui/icons-material/Download';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { toast } from 'react-toastify';
import PacmanLoader from '../../components/PacmanLoader/PacmanLoader';

export default function Projeto({}){
    const navigate = useNavigate();
    const[projeto, setProjeto] = useState({});
    const{id} = useParams();
    const[loadding, setLoadding] = useState(true);

    useEffect(() => {
        buscaPostagem(true);
    }, [])

    function buscaPostagem(top){
        api.get('/Postagem/getById?id=' + id)
        .then(response => {
            if(top)
                window.scrollTo(0, 0);
            setProjeto(response.data.object);
            setLoadding(false);
        })
    }
    
    function createMarkup(text) { return {__html: text}; };

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

    function sendLike(positive, porjectId){
        api.post((positive ? 'Postagem/like' : 'Postagem/dislike') + '?postagemId=' + porjectId)
        .then(_ => {
            setLoadding(true);
            buscaPostagem(false);
        });
    }

    const externalLink = projeto?.link;
    const repoLink = projeto?.linkRepositorio || projeto?.repositorio || projeto?.repo || projeto?.github || projeto?.repository;
    const demoLink = projeto?.linkDemo || projeto?.demo || projeto?.site || projeto?.urlDemo || projeto?.demoUrl || projeto?.siteUrl;
    const isProject = projeto?.tipoPostagem == 0;

    const stackValue = projeto?.techStack || projeto?.stack || projeto?.tecnologias || projeto?.tecnologia;
    const statusValue = projeto?.status || projeto?.statusProjeto;
    const yearValue = projeto?.ano || projeto?.year || (projeto?.created ? new Date(projeto.created).getFullYear() : null);

    const stackLabel = Array.isArray(stackValue) ? stackValue.join(' ? ') : stackValue;
    const normalizedStatus = typeof statusValue === 'string' ? statusValue.trim().toLowerCase() : statusValue;
    const statusMap = {
        'ativo': 'Ativo',
        'active': 'Ativo',
        'em evolu??o': 'Em evolu??o',
        'em evolucao': 'Em evolu??o',
        'evolving': 'Em evolu??o',
        'arquivado': 'Arquivado',
        'archived': 'Arquivado',
        'inativo': 'Arquivado',
    };
    const statusLabel = typeof normalizedStatus === 'string' && statusMap[normalizedStatus]
        ? statusMap[normalizedStatus]
        : statusValue;

    const chips = [];
    if (stackLabel) chips.push({ label: 'Tecnologias', value: stackLabel });
    if (statusLabel) chips.push({ label: 'Status', value: statusLabel });
    if (yearValue) chips.push({ label: 'Ano', value: yearValue });

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
                    {repoLink ? (
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
                    {demoLink ? (
                        <a
                            className='projeto-cta projeto-cta--secondary'
                            target='_blank'
                            rel='noopener noreferrer'
                            href={demoLink}
                            title='Abre em nova aba'
                        >
                            Site / Demo <span aria-hidden='true'>(↗)</span>
                        </a>
                    ) : null}
                </div>
            </div>
            <div className='projeto-title-div'>
                <h1 className='projeto-title'>
                    {projeto.titulo}
                </h1>
                <div className='projeto-download-icon'>
                    {projeto.tipoPostagem == 1 ? <DownloadIcon fontSize="large"/> : <></>}
                </div>
            </div>
            {isProject && chips.length > 0 ? (
                <div className='projeto-chips'>
                    {chips.map((chip) => (
                        <span key={chip.label} className='projeto-chip'>
                            <span className='projeto-chip-label'>{chip.label}:</span> {chip.value}
                        </span>
                    ))}
                </div>
            ) : null}
            <sub>{formatDate(projeto.created)}</sub>
            <sub>{projeto.intro}</sub>
            <div className="projeto-img">
                <img src={projeto.capa} alt={projeto.titulo}/>
            </div>
            <h4 dangerouslySetInnerHTML={createMarkup(projeto.descricao)}></h4>
            {
                projeto.link ?
                <div className='projeto-link'>
                    <h4>
                        {projeto.tipoPostagem == 0 ? 'Abrir' : 'Baixar'}: <a target='_blank' rel='noopener noreferrer' title='Abre em nova aba' href={projeto.link}>{projeto.tipoPostagem == 0 ? 'Abrir' : 'Baixar'} <span aria-hidden='true'>(↗)</span></a>
                    </h4>
                </div>
                :
                <></>
            }
            <div className='enviarFeedBack'>
                <a onClick={() => enviarFeedBack(projeto.titulo)}>Enviar FeedBack</a>
            </div>
            <div className='curtidas'>
                <div className='curtidas-like'>
                    <ThumbUpIcon className='option-link' onClick={() => sendLike(true, projeto.id)} />
                </div>
                <div className='curtidas-dislike'>
                    <ThumbDownIcon className='option-link' onClick={() => sendLike(false, projeto.id)}/>
                </div>
                <div className='curtidas-quantidade'>
                    <h4>{projeto.curtidas}</h4>
                </div>
            </div>
        </div>
    )
}