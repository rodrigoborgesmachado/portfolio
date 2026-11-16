import './publicacoesSelecionadas.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { publicacoesSelecionadas } from '../../content/perfil';
import { useIdioma } from '../../context/IdiomaContext/idiomaContext';

export default function PublicacoesSelecionadas(){
    const { t, campo } = useIdioma();
    const [itens, setItens] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        api.get('/Postagem/pagged?page=1&quantity=200&tipoPostagem=Articles')
            .then(response => {
                const todos = response.data.object || [];
                setTotal(response.data.total || todos.length);
                setItens(publicacoesSelecionadas
                    .map(titulo => todos.find(p => p.titulo === titulo))
                    .filter(Boolean));
            })
            .catch(() => setItens([]));
    }, []);

    if (itens.length === 0) return null;

    return(
        <section className="publicacoes" id="publicacoes" aria-labelledby="publicacoes-titulo">
            <h2 id="publicacoes-titulo">{t.publicacoesTitulo}</h2>
            <ul className="publicacoes-lista">
                {itens.map(p => (
                    <li key={p.id}>
                        <Link to={`/projeto/${p.id}`}>{campo(p, 'titulo')}</Link>
                        <span>{new Date(p.created).getFullYear()}</span>
                    </li>
                ))}
            </ul>
            <Link className="publicacoes-todas" to="/postagens">{t.todasPublicacoes} ({total})</Link>
        </section>
    )
}
