import './projetosPagged.css';
import api from './../../services/api'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Loader from './../Loader/loader.js';
import PacmanLoader from '../PacmanLoader/PacmanLoader.js';

export default function ProjetosPagged({resum = true, tipo=0}){
    const navigate = useNavigate();
    const[projetos, setProjetos] = useState([]);
    const[loadding, setLoadding] = useState(true);
    const[page, setPage] = useState(1);
    const[quantity, setQuantity] = useState(1);
    const[max, setMax] = useState(6);

    useEffect(() => {
        BuscaProjetos();
    }, [page])

    function BuscaProjetos(){
        setLoadding(true);
        api.get(`/Postagem/pagged?page=${page}&quantity=${max}&tipoPostagem=${tipo == 0 ? 'Featured_Projects' : 'Articles'}`)
        .then(response => {
            setQuantity(response.data.total);
            setProjetos(response.data.object);
            setLoadding(false);
        })
        .catch(() => {
            setQuantity(0);
            setProjetos([]);
            setLoadding(false);
        })
    }

    const handleChange = (event, value) => {
        setPage(value);
        scrollToDiv()
    };

    function scrollToDiv() {
        const targetDiv = document.getElementById(tipo == 0 ? 'projetos' : 'postagens');
        if (targetDiv) {
          targetDiv.scrollIntoView({ behavior: 'smooth' });
        }
      }

    function createMarkup(text) { return {__html: text}; };

    function abrirProjeto(id){
        navigate(`/projeto/${id}`, {replace: true});
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
    
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`;
    }

    function openPostagens(){
        navigate(`/postagens`, {replace: true});
    }

    function openProjetos(){
        navigate(`/projetos`, {replace: true});
    }

    if(loadding){
        return(
            <PacmanLoader/>
        )
    }

    return(
        <div className={ resum ? "projetosPagged" : "projetosPagged-full"}>
            <div className='apresentacao-projetos' id={tipo == 0 ? 'projetos' : 'postagens'}>
                <h2 className='option-link' onClick={() => tipo == 0 ? openProjetos() : openPostagens()}>
                    {tipo == 0 ? 'Projetos' : 'Publicações'} ({quantity}):
                </h2>
            </div>
            {
                projetos.map((item, id) => {
                    return(
                        <>
                            <div className="projetos-item" key={id}>
                                <div className="projetos-item-imagem">
                                    <img src={item.capa} alt={item.titulo} onClick={() => abrirProjeto(item.id)}/>
                                </div>
                                <div className="projetos-item-descricao">
                                    <div className='projetos-item-titulo'>
                                        <h3 className="option-link" onClick={() => abrirProjeto(item.id)}>{item.titulo}</h3>
                                        <a className="option-link" target='_blank' href={item.link}>Acessar</a>
                                    </div>
                                    <sub>Publicação: {formatDate(item.created)}</sub>
                                    <h4 className="option-link" dangerouslySetInnerHTML={createMarkup(item.intro)}></h4>
                                </div>
                            </div>
                        </>
                    )
                })
            }
            <div className='paginacao'>
                {
                    quantity > 0 ?
                        <Stack spacing={4}>
                            <Pagination sx={{
                    '& .Mui-selected': {
                        color: 'var(--text-color-primary)'},
                    '& .MuiPaginationItem-root': {
                        color: 'var(--text-color-primary)',
                
                }}} count={Math.ceil(quantity / max)} page={parseInt(page)} showFirstButton showLastButton onChange={handleChange} />
                        </Stack>
                        :
                        <>
                        </>
                }
            </div>
        </div>
    )
}