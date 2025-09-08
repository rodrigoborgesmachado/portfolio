import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";
import Loader from '../../components/Loader/loader';
import DownloadIcon from '@mui/icons-material/Download';
import ReadmeComponent from "../../components/ReadmeComponent/readmeComponet";

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

    if(loadding){
        return(
            <Loader/>
        )
    }

    return(
        <div className="projeto-full">
            
            <ReadmeComponent info={repositorio.descricao}/>
            <div className='projeto-link'>
                <h4>
                    Criado em {formatDate(repositorio.created)}
                </h4>
            </div>

            <div className='projeto-link'>
                <h4>
                    Acesse: <a target='_blank' href={repositorio.link}>{repositorio.link}</a>
                </h4>
            </div>
            
            <div className='enviarFeedBack'>
                <a onClick={() => enviarFeedBack(repositorio.titulo)}>Enviar FeedBack</a>
            </div>
        </div>
    )
}