import './projeto.css';
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";
import Loader from '../../components/Loader/loader';
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

    if(loadding){
        return(
            <PacmanLoader/>
        )
    }

    return(
        <div className="projeto-full">
            <div className='projeto-title-div' onClick={() =>  window.open(projeto.link, '_blank', 'noopener,noreferrer')}>
                <h1 className='projeto-title'>
                    {projeto.titulo}
                </h1>
                <div className='projeto-download-icon'>
                    {projeto.tipoPostagem == 1 ? <DownloadIcon fontSize="large"/> : <></>}
                </div>
            </div>
            <sub>{formatDate(projeto.created)}</sub>
            <sub>{projeto.intro}</sub>
            <div className="projeto-img">
                {
                    projeto.link ? 
                    <img src={projeto.capa} alt={projeto.titulo} onClick={() =>  window.open(projeto.link, '_blank', 'noopener,noreferrer')}/>
                    :
                    <img src={projeto.capa} alt={projeto.titulo}/>
                }
            </div>
            <h4 dangerouslySetInnerHTML={createMarkup(projeto.descricao)}></h4>
            {
                projeto.link ?
                <div className='projeto-link'>
                    <h4>
                        {projeto.tipoPostagem == 0 ? 'Acesse' : 'Faça o download'}: <a target='_blank' href={projeto.link}>{projeto.link}</a>
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