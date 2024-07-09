import './projetosPagged.css';
import api from './../../services/api'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Loader from './../Loader/loader.js';

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
    }

    const handleChange = (event, value) => {
        setPage(value);
    };

    function createMarkup(text) { return {__html: text}; };

    function abrirProjeto(id){
        navigate(`/projeto/${id}`, {replace: true});
    }

    if(loadding){
        return(
            <Loader/>
        )
    }

    return(
        <div className={ resum ? "projetosPagged" : "projetosPagged-full"}>
            {
                resum ?
                <></>
                :
                <div className='apresentacao-projetos'>
                    <h2 className='option-link'>
                        {tipo == 0 ? 'Projetos' : 'Postagens'}
                    </h2>
                </div>
            }
            {
                projetos.map((item, id) => {
                    return(
                        <>
                        {
                            resum ?
                            <div className="projetos-item" id={id}>
                                <div className="projetos-item-imagem">
                                    <img src={item.capa} alt={item.titulo}/>
                                </div>
                                <div className="projetos-item-descricao">
                                    <h3 className="option-link" onClick={() => abrirProjeto(item.id)}>{item.titulo}</h3>
                                    <h4 className="option-link" dangerouslySetInnerHTML={createMarkup(item.intro)}></h4>
                                </div>
                            </div>
                            :
                            <div className="projetos-item" id={id}>
                                <div className="projetos-item-imagem">
                                    <img src={item.capa} alt={item.titulo}/>
                                </div>
                                <div className="projetos-item-descricao">
                                    <h3 className="option-link" onClick={() => abrirProjeto(item.id)}>{item.titulo}</h3>
                                    <h4 className="option-link" dangerouslySetInnerHTML={createMarkup(item.intro)}></h4>
                                </div>
                            </div>
                        }
                        </>
                    )
                })
            }
            {
                resum ?
                <></>
                :
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
            }
        </div>
    )
}