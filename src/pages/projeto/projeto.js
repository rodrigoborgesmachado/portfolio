import './projeto.css';
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";
import Loader from '../../components/Loader/loader';

export default function Projeto({}){
    const navigate = useNavigate();
    const[projeto, setProjeto] = useState({});
    const{id} = useParams();
    const[loadding, setLoadding] = useState(true);

    useEffect(() => {
        api.get('/Postagem/getById?id=' + id)
        .then(response => {
            setProjeto(response.data.object);
            setLoadding(false);
        })
    }, [])
    function createMarkup(text) { return {__html: text}; };

    if(loadding){
        return(
            <Loader/>
        )
    }

    return(
        <div className="projeto-full">
            <h1>{projeto.titulo}</h1>
            <sub>{projeto.intro}</sub>
            {
                projeto.link ? 
                <img src={projeto.capa} alt={projeto.titulo} onClick={() =>  window.open(projeto.link, '_blank', 'noopener,noreferrer')}/>
                :
                <img src={projeto.capa} alt={projeto.titulo}/>
            }
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
        </div>
    )
}