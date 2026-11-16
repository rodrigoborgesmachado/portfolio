import { createContext, useContext, useEffect, useState } from 'react';
import textos from '../../content/textos';
import { conteudo } from '../../content/conteudo';

const IDIOMAS = ['pt', 'en'];
const CHAVE = 'idioma';

// Ordem: ?lang= na URL (para compartilhar o link em inglês) > escolha salva > idioma do navegador.
function idiomaInicial(){
    try {
        const daUrl = new URLSearchParams(window.location.search).get('lang');
        if (IDIOMAS.includes(daUrl)) return daUrl;
        const salvo = localStorage.getItem(CHAVE);
        if (IDIOMAS.includes(salvo)) return salvo;
    } catch (e) { /* storage indisponível */ }
    const navegador = (navigator.language || 'pt').toLowerCase();
    return navegador.startsWith('pt') ? 'pt' : 'en';
}

const IdiomaContext = createContext(null);

export function IdiomaProvider({ children }){
    const [idioma, setIdiomaState] = useState(idiomaInicial);

    const setIdioma = (novo) => {
        if (!IDIOMAS.includes(novo)) return;
        setIdiomaState(novo);
        try { localStorage.setItem(CHAVE, novo); } catch (e) { /* ignora */ }
        // Remove ?lang= da URL para a escolha manual valer também ao recarregar.
        const url = new URL(window.location.href);
        if (url.searchParams.has('lang')) {
            url.searchParams.delete('lang');
            window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
        }
    };

    useEffect(() => {
        document.documentElement.lang = idioma === 'en' ? 'en' : 'pt-BR';
        document.title = textos[idioma].tituloPagina;
    }, [idioma]);

    return (
        <IdiomaContext.Provider value={{ idioma, setIdioma }}>
            {children}
        </IdiomaContext.Provider>
    );
}

export function useIdioma(){
    const { idioma, setIdioma } = useContext(IdiomaContext);

    // Campos das postagens da API: usa a versão em inglês quando existir.
    const campo = (item, nome) => {
        if (!item) return '';
        if (idioma === 'en' && item[`${nome}En`]) return item[`${nome}En`];
        return item[nome];
    };

    const formatarData = (valor) => {
        const data = new Date(valor);
        if (idioma === 'en') {
            return data.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        return `${dia}/${mes}/${data.getFullYear()}`;
    };

    return { idioma, setIdioma, t: textos[idioma], c: conteudo[idioma], campo, formatarData };
}
