import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Loader from "../../components/Loader/loader";
import ReadmeComponent from "../../components/ReadmeComponent/readmeComponet";

export default function Repositorio() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [repositorio, setRepositorio] = useState(null);
    const [loading, setLoading] = useState(true);

    // Função para buscar o repositório
    const buscaRepositorio = useCallback(async (scrollTop = false) => {
        try {
            const response = await api.get(`/GitRepositories?page=1&quantity=1&id=${id}`);
            const repo = response.data.object?.[0];
            if (repo) {
                setRepositorio(repo);
                if (scrollTop) window.scrollTo(0, 0);
            }
        } catch (error) {
            console.error("Erro ao buscar repositório:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        buscaRepositorio(true);
    }, [buscaRepositorio]);

    // Formata a data no padrão dd/mm/yyyy
    const formatDate = (dateString) => {
        if (!dateString) return "Data inválida";
        const date = new Date(dateString);
        return date.toLocaleDateString("pt-BR");
    };

    // Redireciona para feedback
    const enviarFeedBack = (titulo) => {
        localStorage.setItem("Assunto", titulo || "Sem título");
        navigate("/contatos/assuntos", { replace: true });
    };

    if (loading) {
        return <Loader />;
    }

    if (!repositorio) {
        return <p style={{ textAlign: "center", marginTop: "20px" }}>Repositório não encontrado.</p>;
    }

    return (
        <div className="projeto-full">
            <ReadmeComponent info={repositorio.descricao} />

            <div className="projeto-link">
                <h4>Criado em {formatDate(repositorio.created)}</h4>
            </div>

            <div className="projeto-link">
                <h4>
                    Acesse:{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={repositorio.link}
                    >
                        {repositorio.link}
                    </a>
                </h4>
            </div>

            <div className="enviarFeedBack">
                <a onClick={() => enviarFeedBack(repositorio.titulo)}>Enviar Feedback</a>
            </div>
        </div>
    );
}
