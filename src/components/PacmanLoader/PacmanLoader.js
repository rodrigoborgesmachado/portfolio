import './PacmanLoader.css';
import { useIdioma } from '../../context/IdiomaContext/idiomaContext';

// Mesmo loader do Tabuada Divertida: boca animada em duas metades e bolinhas sumindo na boca.
export default function PacmanLoader({ size = 64, dots = 5 }) {
  const { t } = useIdioma();

  return (
    <div className="loader-container" role="status">
      <div className="pacman-loader" aria-hidden={true} style={{ '--size': `${size}px`, '--dots': dots }}>
        <div className="pellets">
          {Array.from({ length: dots }, (_, i) => (
            <span key={i} className="pellet" style={{ '--i': i }} />
          ))}
        </div>
        <div className="pacman" />
      </div>
      <span className="pacman-loader-texto">{t.carregando}</span>
    </div>
  );
}
