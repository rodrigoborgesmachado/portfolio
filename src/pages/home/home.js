import './home.css';
import ProjetosPagged from '../../components/ProjetosPagged/projetosPagged';
import RepositoryPagged from '../../components/RepositoryPagged/repositoryPagged';

export default function Home(){
    const profileImages = [
        'https://www.sunsalesystem.com.br/img/rodrigo-1.png',
    ];
    const profileImage = profileImages[Math.floor(Math.random() * profileImages.length)];
    const linkedInUrl = 'https://www.linkedin.com/in/rodrigoborgesmachado/';
    const githubUrl = 'https://github.com/rodrigoborgesmachado';

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
                        Seja bem-vindo ao habitat natural de Rodrigo Machado
                    </h3>
                </div>
            </div>
            <section className="about" aria-labelledby="sobre-mim">
                <div className="about-content">
                    <h2 id="sobre-mim">Sobre mim</h2>

                    <p>
                        Sou desenvolvedor Full Stack, com foco em .NET no backend e React no frontend,
                        e gosto de construir sistemas que façam sentido de ponta a ponta — da modelagem
                        ao deploy. Tenho um cuidado especial com arquitetura, organização de código e
                        soluções que sejam fáceis de evoluir ao longo do tempo, seguindo princípios de
                        Clean Architecture e boas práticas de engenharia.
                    </p>

                    <p>
                        Ao longo dos anos, trabalhei em projetos bem diferentes entre si: aplicações
                        corporativas, sistemas educacionais, ferramentas internas e produtos pessoais.
                        Muitos deles nasceram para resolver problemas reais do dia a dia — estudar melhor,
                        organizar tarefas, visualizar dados ou simplificar processos — e acabaram virando
                        projetos completos, em produção e em constante evolução.
                    </p>

                    <p>
                        Fora do código, sou goleiro de futsal e tenho focado cada vez mais no pedal,
                        que virou parte importante da minha rotina. Gosto da disciplina do esporte,
                        da constância e da ideia de evolução contínua — coisas que, no fim das contas,
                        também levo para o desenvolvimento de software.
                    </p>

                    <ul className="about-highlights">
                        <li>Full Stack (.NET + React)</li>
                        <li>Clean Architecture</li>
                    </ul>

                    <div className="about-ctas">
                        <a
                            className="about-cta"
                            href={linkedInUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Abre em nova aba"
                        >
                            LinkedIn
                        </a>
                        <a
                            className="about-cta"
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Abre em nova aba"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </section>
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
