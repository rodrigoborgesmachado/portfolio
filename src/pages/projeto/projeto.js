import './projeto.css';
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PacmanLoader from '../../components/PacmanLoader/PacmanLoader';
import { useIdioma } from '../../context/IdiomaContext/idiomaContext';

export default function Projeto(){
    const navigate = useNavigate();
    const { t: textos, campo, formatarData } = useIdioma();
    const t = textos.projeto;
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

    const titulo = campo(projeto, 'titulo');
    const externalLink = projeto?.link;
    const repoLink = projeto?.linkRepositorio || projeto?.repositorio || projeto?.repo || projeto?.github || projeto?.repository;
    const demoLink = projeto?.linkDemo || projeto?.demo || projeto?.site || projeto?.urlDemo || projeto?.demoUrl || projeto?.siteUrl;
    const isProject = projeto?.tipoPostagem == 0;

    const stackValue = projeto?.techStack || projeto?.stack || projeto?.tecnologias || projeto?.tecnologia;
    const statusValue = projeto?.status || projeto?.statusProjeto;

    const stackLabel = Array.isArray(stackValue) ? stackValue.join(' · ') : stackValue;
    const normalizedStatus = typeof statusValue === 'string' ? statusValue.trim().toLowerCase() : statusValue;
    const statusMap = {
        'ativo': t.statusAtivo,
        'active': t.statusAtivo,
        'em evolução': t.statusEvolucao,
        'em evolucao': t.statusEvolucao,
        'evolving': t.statusEvolucao,
        'arquivado': t.statusArquivado,
        'archived': t.statusArquivado,
        'inativo': t.statusArquivado,
    };
    const statusLabel = typeof normalizedStatus === 'string' && statusMap[normalizedStatus]
        ? statusMap[normalizedStatus]
        : statusValue;

    const chips = [];
    if (stackLabel) chips.push({ label: textos.tecnologias, value: stackLabel });
    if (statusLabel) chips.push({ label: t.status, value: statusLabel });

    if(loadding){
        return(
            <PacmanLoader/>
        )
    }

    const meta = [formatarData(projeto.created), ...(isProject ? chips.map(c => `${c.label}: ${c.value}`) : [])];

    return(
        <main className="pagina detalhe">
            <button className='detalhe-voltar' type='button' onClick={() => navigate(-1)}>
                <span aria-hidden="true">←</span> {t.voltar}
            </button>

            <h1>{titulo}</h1>
            <p className="detalhe-meta">{meta.filter(Boolean).join('  ·  ')}</p>
            {campo(projeto, 'intro') && <p className="detalhe-intro">{campo(projeto, 'intro')}</p>}

            {(externalLink || repoLink || demoLink) && (
                <div className="detalhe-acoes">
                    {externalLink && (
                        <a className="btn btn-primary" target='_blank' rel='noopener noreferrer' href={externalLink} title={textos.abreNovaAba}>
                            {isProject ? t.abrir : t.baixar} <span aria-hidden='true'>{'↗︎'}</span>
                        </a>
                    )}
                    {repoLink && (
                        <a target='_blank' rel='noopener noreferrer' href={repoLink} title={textos.abreNovaAba}>{t.verCodigo}</a>
                    )}
                    {demoLink && (
                        <a target='_blank' rel='noopener noreferrer' href={demoLink} title={textos.abreNovaAba}>{t.siteDemo}</a>
                    )}
                </div>
            )}

            {projeto.capa && (
                <figure className="detalhe-capa">
                    <img src={projeto.capa} alt="" />
                </figure>
            )}

            <div className="detalhe-texto" dangerouslySetInnerHTML={createMarkup(campo(projeto, 'descricao'))}></div>

            <div className="detalhe-rodape">
                <button type="button" className="detalhe-feedback" onClick={() => enviarFeedBack(projeto.titulo)}>
                    {t.enviarFeedback}
                </button>
                <div className="detalhe-curtidas">
                    <button type="button" aria-label="Like" onClick={() => sendLike(true, projeto.id)}>
                        <ThumbUpIcon fontSize="small" />
                    </button>
                    <button type="button" aria-label="Dislike" onClick={() => sendLike(false, projeto.id)}>
                        <ThumbDownIcon fontSize="small" />
                    </button>
                    <span>{projeto.curtidas}</span>
                </div>
            </div>
        </main>
    )
}
