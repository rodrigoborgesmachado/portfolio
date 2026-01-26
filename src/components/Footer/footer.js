import './footer.css';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import { toast } from 'react-toastify';

export default function Footer(){

    const openUrl = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };

    const copy = (text) => {
        navigator.clipboard.writeText(text)
          .then(() => {
            toast.success('Texto copiado para área de transferência!');
          })
          .catch(err => {
            toast.error('Erro ao copiar: ' + err);
          });
      };

    return(
        <div className="footer">
            <div className="footer-assinatura">
                <h3>© Rodrigo Machado</h3>
            </div>
            <div className="footer-icones">
                <EmailIcon className='option-link' onClick={() => copy('rodrigoborgesmachado.com')}/>
                <LinkedInIcon className='option-link' onClick={() => openUrl('https://www.linkedin.com/in/rodrigoborgesmachado/')}/>
                <WhatsAppIcon className='option-link' onClick={() => openUrl('https://wa.me/+5534999798100')}/>
                <GitHubIcon className='option-link' onClick={() => openUrl('https://github.com/rodrigoborgesmachado')}/>
                <a
                    href="https://strava.com/athletes/165837732"
                    className="strava-badge- strava-badge-follow"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src="https://badges.strava.com/echelon-sprite-24.png" alt="Strava" />
                </a>
            </div>
        </div>
    )
}
