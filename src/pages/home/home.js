import './home.css';
import ProjetosPagged from '../../components/ProjetosPagged/projetosPagged';
import { useNavigate } from 'react-router-dom';

export default function Home(){
    const navigate = useNavigate();

    function openProjetos(){
        navigate(`/projetos`, {replace: true});
    }

    function openPostagens(){
        navigate(`/postagens`, {replace: true});
    }

    return(
        <div className="container">
            <div className="presentation">
                <h1>
                    Hello,
                </h1>
                <h3>
                    Seja bem vindo ao habitate natural de Rodrigo Machado
                </h3>
            </div>
            <div className='projects'>
                <h2 className='option-link' onClick={() => openProjetos()}>
                    Projetos:
                </h2>
                <ProjetosPagged tipo={0}/>
            </div>
            <div className='posts'>
                <h2 className='option-link' onClick={() => openPostagens()}>
                    Postagens:
                </h2>
                <ProjetosPagged tipo={1}/>
            </div>
        </div>
    )
}