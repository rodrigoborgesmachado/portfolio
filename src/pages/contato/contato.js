import './contato.css';
import { useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/loader';

export default function Contato({ usaAssunto }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [escola, setEscola] = useState('');
    const [assunto, setAssunto] = useState(usaAssunto ? localStorage.getItem('Assunto') : '');
    const [mensagem, setMensagem] = useState('');
    const [loading, setLoading] = useState(false);

    function submit() {
        if (!nome) return toast.info('Forneça seu nome!');
        if (!email) return toast.info('Forneça seu email!');
        if (!mensagem) return toast.info('Forneça uma mensagem!');

        setLoading(true);
        const form = { Nome: nome, Email: email, Empresa: empresa, Escola: escola, Assunto: assunto, Mensagem: mensagem };

        api.post('/email/enviaEmailContato', form)
            .then(response => {
                if (response.data.success) {
                    toast.success('Email enviado!');
                    setNome('');
                    setEmail('');
                    setEmpresa('');
                    setEscola('');
                    setMensagem('');
                } else {
                    toast.error('Serviço indisponível no momento');
                }
                setLoading(false);
            });
    }

    if (loading) return <Loader />;

    return (
        <div className="container">
            <div className="projeto-full contact-container">
                <div className='tittle-form'>
                    <h2>📩 Entre em contato</h2>
                    <p className="form-subtitle">
                        Me envie um email para rodrigoborgesmachado@gmail.com 
                        ou use o formulário abaixo!
                    </p>
                </div>

                <div className='form-contact'>
                    <div className='form-contact-line'>
                        <div className='form-contact-line-item'>
                            <label>Nome*</label>
                            <input className='input-pattern' type='text' value={nome} onChange={(e) => setNome(e.target.value)} placeholder='Charles Babbage' />
                        </div>
                        <div className='form-contact-line-item'>
                            <label>Email*</label>
                            <input className='input-pattern' type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='charles@babbage.com' />
                        </div>
                    </div>

                    <div className='form-contact-line'>
                        <div className='form-contact-line-item'>
                            <label>Empresa (opcional)</label>
                            <input className='input-pattern' type='text' value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder='Deloitte' />
                        </div>
                        <div className='form-contact-line-item'>
                            <label>Instituição de ensino (opcional)</label>
                            <input className='input-pattern' type='text' value={escola} onChange={(e) => setEscola(e.target.value)} placeholder='UFU' />
                        </div>
                    </div>

                    <div className='form-contact-line'>
                        <div className='form-contact-line-item-message'>
                            <label>Assunto*</label>
                            <input className='input-pattern' type='text' value={assunto} onChange={(e) => setAssunto(e.target.value)} placeholder='Contato' />
                        </div>
                    </div>

                    <div className='form-contact-line'>
                        <div className='form-contact-line-item-message'>
                            <label>Mensagem*</label>
                            <textarea className='input-pattern' rows="10" value={mensagem} onChange={(e) => setMensagem(e.target.value)} placeholder='Olha esse algoritmo que eu criei...'></textarea>
                        </div>
                    </div>

                    <div className='form-contact-line'>
                        <div className='form-contact-line-item-submit'>
                            <button className="btn-submit" onClick={submit}>
                                ✉️ Enviar Mensagem
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
