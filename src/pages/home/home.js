import './home.css';
import ProjetosPagged from '../../components/ProjetosPagged/projetosPagged';
import RepositoryPagged from '../../components/RepositoryPagged/repositoryPagged';

export default function Home(){
    return(
        <div className="container">
            <div className="presentation">
                <h1>
                    Hello,
                </h1>
                <h3>
                    Seja bem vindo ao habitat natural de Rodrigo Machado
                </h3>
            </div>
            <div className='projects'>
                <ProjetosPagged tipo={0}/>
            </div>
            <div className='posts'>
                <ProjetosPagged tipo={1}/>
            </div>
            <div className='posts'>
                <RepositoryPagged/>
            </div>
        </div>
    )
}