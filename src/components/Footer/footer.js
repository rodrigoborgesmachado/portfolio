import './footer.css';
import { links } from '../../content/perfil';

export default function Footer(){
    return(
        <footer className="footer">
            <span>© {new Date().getFullYear()} Rodrigo Machado</span>
            <nav className="footer-links" aria-label="Links">
                <a href={`mailto:${links.email}`}>Email</a>
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://wa.me/+5534999798100" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                <a href="https://strava.com/athletes/165837732" target="_blank" rel="noopener noreferrer">Strava</a>
            </nav>
        </footer>
    )
}
