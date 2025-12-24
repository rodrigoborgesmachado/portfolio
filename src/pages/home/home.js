import './home.css';
import ProjetosPagged from '../../components/ProjetosPagged/projetosPagged';
import RepositoryPagged from '../../components/RepositoryPagged/repositoryPagged';

export default function Home(){
    const profileImages = [
        'https://www.sunsalesystem.com.br/img/rodrigo-1.jpeg',
        'https://www.sunsalesystem.com.br/img/rodrigo-2.jpeg',
        'https://www.sunsalesystem.com.br/img/rodrigo-3.jpeg',
    ];
    const profileImage = profileImages[Math.floor(Math.random() * profileImages.length)];

    return(
        <div className="container">
            <div className="presentation">
                <div className="presentation-avatar">
                    <img src={profileImage} alt="Rodrigo Machado" />
                </div>
                <div className='presentation-message'>
                    <h1>
                        Hello,
                    </h1>
                    <h3>
                        Seja bem vindo ao habitat natural de Rodrigo Machado
                    </h3>
                </div>
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
