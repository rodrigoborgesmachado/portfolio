import './contato.css';
import { useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import PacmanLoader from '../../components/PacmanLoader/PacmanLoader';
import { links } from '../../content/perfil';
import { useIdioma } from '../../context/IdiomaContext/idiomaContext';

export default function Contato({usaAssunto}){
    const { t: textos } = useIdioma();
    const t = textos.contato;
    const assunto = (usaAssunto && localStorage.getItem('Assunto')) || '';
    const[nome, setNome] = useState('');
    const[email, setEmail] = useState('');
    const[mensagem, setMensagem] = useState('');
    const[loading, setLoading] = useState(false);

    function copiarEmail(){
        navigator.clipboard.writeText(links.email)
            .then(() => toast.success(t.emailCopiado))
            .catch(() => toast.error(t.erroCopiar));
    }

    function submit(e){
        e.preventDefault();

        if(!nome){
            toast.info(t.faltaNome);
            return;
        }
        if(!email){
            toast.info(t.faltaEmail);
            return;
        }
        if(!mensagem){
            toast.info(t.faltaMensagem);
            return;
        }

        setLoading(true);
        const form = {
            "Nome": nome,
            "Email": email,
            "Empresa": '',
            "Escola": '',
            "Assunto": assunto || t.assuntoPadrao,
            "Mensagem": mensagem
        };

        api.post('/email/enviaEmailContato', form)
        .then(response => {
            if(response.data.success){
                toast.success(t.enviado);
                setNome('');
                setEmail('');
                setMensagem('');
            }
            else{
                toast.error(t.erro);
            }
        })
        .catch(() => toast.error(t.erro))
        .finally(() => setLoading(false));
    }

    if(loading)
        return(
            <PacmanLoader/>
        )

    return(
        <main className="pagina contato">
                <h1>{t.titulo}</h1>
                <p className="contato-intro">{t.intro}</p>

                <div className="contato-canais">
                    <div className="contato-canal">
                        <span className="contato-canal-rotulo">{t.email}</span>
                        <a className="contato-canal-valor" href={`mailto:${links.email}`}>{links.email}</a>
                        <button type="button" className="contato-copiar" onClick={copiarEmail}>{t.copiar}</button>
                    </div>
                    <div className="contato-canal">
                        <span className="contato-canal-rotulo">LinkedIn</span>
                        <a
                            className="contato-canal-valor"
                            href={links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            linkedin.com/in/rodrigoborgesmachado
                        </a>
                    </div>
                    <div className="contato-canal">
                        <span className="contato-canal-rotulo">{textos.curriculo}</span>
                        <span className="contato-canal-valor">
                            {links.curriculos.map((cv, i) => (
                                <span key={cv.href}>
                                    {i > 0 && ' · '}
                                    <a href={cv.href} target="_blank" rel="noopener noreferrer">{cv.idioma}</a>
                                </span>
                            ))}
                        </span>
                    </div>
                </div>

                <form className="contato-form" onSubmit={submit} noValidate>
                    <h2>{t.mensagemTitulo}</h2>
                    {assunto && <p className="contato-assunto">{t.sobre}: <strong>{assunto}</strong></p>}
                    <div className="contato-linha">
                        <label className="contato-campo">
                            {t.nome}
                            <input className='input-pattern' type='text' name='nome' value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" required/>
                        </label>
                        <label className="contato-campo">
                            {t.email}
                            <input className='input-pattern' type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required/>
                        </label>
                    </div>
                    <label className="contato-campo">
                        {t.mensagem}
                        <textarea className='input-pattern' name='mensagem' rows="7" value={mensagem} onChange={(e) => setMensagem(e.target.value)} required/>
                    </label>
                    <div className="contato-enviar">
                        <button type="submit" className="btn btn-primary">{t.enviar}</button>
                    </div>
                    <p className='contato-privacidade'>{t.privacidade}</p>
                </form>
        </main>
    )
}
