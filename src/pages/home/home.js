import './home.css';
import { useState, useEffect } from 'react';
import ProjetosPagged from '../../components/ProjetosPagged/projetosPagged';
import RepositoryPagged from '../../components/RepositoryPagged/repositoryPagged';

export default function Home() {
    const [text, setText] = useState('');
    const fullText = "Hello,";
    
    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            setText(fullText.slice(0, i + 1));
            i++;
            if (i === fullText.length) clearInterval(timer);
        }, 120);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="container">
            <section className="hero">
                <div className="presentation">
                    <h1 className="typing">{text}</h1>
                    <p className="subtitle">
                        Seja bem-vindo ao habitat natural de Rodrigo Machado
                    </p>
                    <a href="#projects" className="cta-button">Ver Projetos ↓</a>
                </div>
            </section>

            <section id="projects" className='projects-section fade-section'>
                <h2>📄 Projetos em Destaque</h2>
                <ProjetosPagged tipo={0}/>
            </section>

            <section className='posts-section fade-section'>
                <h2>📝 Posts Recentes</h2>
                <ProjetosPagged tipo={1}/>
            </section>

            <section className='repos-section fade-section'>
                <h2>📂 Repositórios</h2>
                <RepositoryPagged/>
            </section>
        </div>
    )
}
