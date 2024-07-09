import './contato.css';
import { useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/loader';

export default function Contato(){
    const[nome, setNome] = useState('');
    const[email, setEmail] = useState('');
    const[empresa, setEmpresa] = useState('');
    const[escola, setEscola] = useState('');
    const[mensagem, setMensagem] = useState('');
    const[loading, setLoading] = useState(false);

    function submit(){

        if(!nome){
            toast.info('Forneça seu nome!');
        }
        else if(!email){
            toast.info('Forneça seu email!');
        }
        else if(!mensagem){
            toast.info('Forneça uma mensagem!');
        }
        else{
            setLoading(true);
            var form = {
                "Nome": nome,
                "Email": email,
                "Empresa": empresa,
                "Escola": escola,
                "Mensagem": mensagem
            };
            
            api.post('/email/enviaEmailContato', form)
            .then(response => {
                if(response.data.success){
                    toast.success('Email enviado!');
                    setNome('');
                    setEmail('');
                    setEmpresa('');
                    setEscola('');
                    setMensagem('');
                }
                else{
                    toast.error('Serviço indisponível no momento');
                }
                setLoading(false);

            });
        }
    }

    if(loading)
        return(
            <Loader/>
        )

    return(
        <div className="container">
            <div className="projeto-full">
                <div className='tittle-form'>
                    <h2>Entre em contato</h2>
                </div>
                <div className='form-contact'>
                    <div className='form-contact-message'>
                        <h3>Me envie um email em rodrigoborgesmachado@gmail.com, ou use o formulário abaixo!</h3>
                    </div>
                    <div className='form-contact-line'>
                        <div className='form-contact-line-item'>
                            <h4>Nome*</h4>
                            <input className='input-pattern' type='text' name='nome' id='nome' value={nome} onChange={(e) => setNome(e.target.value)} placeholder='Charles Babbage' required={true}/>
                        </div>
                        <div className='form-contact-line-item'>
                            <h4>Email*</h4>
                            <input className='input-pattern' type='email' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='charles@babbage.com' required={true}/>
                        </div>
                    </div>
                    <div className='form-contact-line'>
                        <div className='form-contact-line-item'>
                            <h4>Empresa (opcional)</h4>
                            <input className='input-pattern' type='text' name='empresa' id='empresa' value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder='Deloitte'/>
                        </div>
                        <div className='form-contact-line-item'>
                            <h4>Instituição de ensino (opcional)</h4>
                            <input className='input-pattern' type='text' name='escola' id='escola' value={escola} onChange={(e) => setEscola(e.target.value)} placeholder='UFU'/>
                        </div>
                    </div>
                    <div className='form-contact-line'>
                        <div className='form-contact-line-item-message'>
                            <h4>Mensagem*</h4>
                            <textarea className='input-pattern' type='text' rows="35" name='mensagem' id='mensagem' value={mensagem} onChange={(e) => setMensagem(e.target.value)} placeholder='Olha esse algoritmo que eu criei...' required={true}/>
                        </div>
                    </div>
                    <div className='form-contact-line'>
                        <div className='form-contact-line-item-submit'>
                            <button  onClick={() => submit()}>Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}