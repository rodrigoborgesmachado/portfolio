import './admin.css';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';

const STORAGE_KEYS = {
    TOKEN: 'sunsale_admin_token',
    NAME: 'sunsale_admin_name',
    USERNAME: 'sunsale_admin_username',
    ADMIN: 'sunsale_admin_is_admin',
};

function stringToHash(string) {
    let hash = 0;

    if (string.length === 0) return hash;

    for (let i = 0; i < string.length; i++) {
        let char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return hash;
}

const emptyForm = {
    Titulo: '',
    TituloEn: '',
    Intro: '',
    IntroEn: '',
    Resumo: '',
    ResumoEn: '',
    Descricao: '',
    DescricaoEn: '',
    Capa: '',
    Curtidas: 0,
    Link: '',
};

export default function Admin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [token, setToken] = useState('');
    const [adminName, setAdminName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tipoPostagem, setTipoPostagem] = useState(0);
    const [form, setForm] = useState(emptyForm);

    const isLoggedIn = useMemo(() => Boolean(token && isAdmin), [token, isAdmin]);

    useEffect(() => {
        const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const storedName = localStorage.getItem(STORAGE_KEYS.NAME);
        const storedAdmin = localStorage.getItem(STORAGE_KEYS.ADMIN);

        if (storedToken && storedAdmin === '1') {
            setToken(storedToken);
            setAdminName(storedName || '');
            setIsAdmin(true);
        }
    }, []);

    function handleFieldChange(event) {
        const { name, value } = event.target;
        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    }

    async function handleLogin(event) {
        event.preventDefault();
        setLoading(true);

        try {
            const payload = {
                userName: email,
                username: email,
                password: stringToHash(senha) + '',
            };
            const response = await api.post('/Token', payload);
            const responseToken = response.data?.token;
            const responseAdmin = response.data?.admin;
            const adminValue = responseAdmin === '1' || responseAdmin === 1 || responseAdmin === true;

            if (!responseToken) {
                throw new Error('Missing token');
            }

            if (!adminValue) {
                toast.error('Access denied.');
                return;
            }

            setToken(responseToken);
            setAdminName(response.data?.nome || response.data?.username || email);
            setIsAdmin(true);
            localStorage.setItem(STORAGE_KEYS.TOKEN, responseToken);
            localStorage.setItem(STORAGE_KEYS.NAME, response.data?.nome || '');
            localStorage.setItem(STORAGE_KEYS.USERNAME, response.data?.username || email);
            localStorage.setItem(STORAGE_KEYS.ADMIN, '1');
            toast.success('Login OK.');
        } catch (error) {
            toast.error('Login failed.');
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        setToken('');
        setAdminName('');
        setIsAdmin(false);
        setEmail('');
        setSenha('');
        setForm(emptyForm);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.NAME);
        localStorage.removeItem(STORAGE_KEYS.USERNAME);
        localStorage.removeItem(STORAGE_KEYS.ADMIN);
        toast.info('Logged out.');
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...form,
                TipoPostagem: Number(tipoPostagem),
                Curtidas: Number(form.Curtidas || 0),
            };

            await api.post('/Postagem', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setForm(emptyForm);
            toast.success('Post created.');
        } catch (error) {
            toast.error('Failed to create post.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="admin-page">
            <div className="admin-card">
                <div className="admin-header">
                    <h1>Admin</h1>
                    {isLoggedIn ? (
                        <div className="admin-user">
                            <span>{adminName || 'Admin'}</span>
                            <button className="admin-button admin-button--ghost" onClick={handleLogout} disabled={loading}>
                                Logout
                            </button>
                        </div>
                    ) : null}
                </div>

                {!isLoggedIn ? (
                    <form className="admin-form" onSubmit={handleLogin}>
                        <div className="admin-field">
                            <label htmlFor="admin-email">Email</label>
                            <input
                                id="admin-email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div className="admin-field">
                            <label htmlFor="admin-password">Password</label>
                            <input
                                id="admin-password"
                                type="password"
                                value={senha}
                                onChange={(event) => setSenha(event.target.value)}
                                required
                            />
                        </div>
                        <button className="admin-button" type="submit" disabled={loading}>
                            {loading ? 'Signing in...' : 'Login'}
                        </button>
                    </form>
                ) : (
                    <form className="admin-form admin-form--wide" onSubmit={handleSubmit}>
                        <div className="admin-section">
                            <button
                                type="button"
                                className={`admin-toggle ${tipoPostagem === 0 ? 'admin-toggle--active' : ''}`}
                                onClick={() => setTipoPostagem(0)}
                            >
                                New Project
                            </button>
                            <button
                                type="button"
                                className={`admin-toggle ${tipoPostagem === 1 ? 'admin-toggle--active' : ''}`}
                                onClick={() => setTipoPostagem(1)}
                            >
                                New Post
                            </button>
                        </div>

                        <div className="admin-grid">
                            <div className="admin-field">
                                <label htmlFor="Titulo">Title</label>
                                <input id="Titulo" name="Titulo" value={form.Titulo} onChange={handleFieldChange} required />
                            </div>
                            <div className="admin-field">
                                <label htmlFor="TituloEn">Title (EN)</label>
                                <input id="TituloEn" name="TituloEn" value={form.TituloEn} onChange={handleFieldChange} />
                            </div>
                            <div className="admin-field">
                                <label htmlFor="Intro">Intro</label>
                                <textarea id="Intro" name="Intro" value={form.Intro} onChange={handleFieldChange} rows="2" />
                            </div>
                            <div className="admin-field">
                                <label htmlFor="IntroEn">Intro (EN)</label>
                                <textarea id="IntroEn" name="IntroEn" value={form.IntroEn} onChange={handleFieldChange} rows="2" />
                            </div>
                            <div className="admin-field">
                                <label htmlFor="Resumo">Summary</label>
                                <textarea id="Resumo" name="Resumo" value={form.Resumo} onChange={handleFieldChange} rows="3" />
                            </div>
                            <div className="admin-field">
                                <label htmlFor="ResumoEn">Summary (EN)</label>
                                <textarea id="ResumoEn" name="ResumoEn" value={form.ResumoEn} onChange={handleFieldChange} rows="3" />
                            </div>
                            <div className="admin-field">
                                <label htmlFor="Descricao">Description</label>
                                <textarea id="Descricao" name="Descricao" value={form.Descricao} onChange={handleFieldChange} rows="20" required />
                            </div>
                            <div className="admin-field">
                                <label htmlFor="DescricaoEn">Description (EN)</label>
                                <textarea id="DescricaoEn" name="DescricaoEn" value={form.DescricaoEn} onChange={handleFieldChange} rows="20" />
                            </div>
                            <div className="admin-field">
                                <label htmlFor="Capa">Cover URL</label>
                                <input id="Capa" name="Capa" value={form.Capa} onChange={handleFieldChange} />
                            </div>
                            <div className="admin-field">
                                <label htmlFor="Link">Link</label>
                                <input id="Link" name="Link" value={form.Link} onChange={handleFieldChange} />
                            </div>
                            <div className="admin-field">
                                <label htmlFor="Curtidas">Likes</label>
                                <input
                                    id="Curtidas"
                                    name="Curtidas"
                                    type="number"
                                    min="0"
                                    value={form.Curtidas}
                                    onChange={handleFieldChange}
                                />
                            </div>
                            <div className="admin-field">
                                <label htmlFor="TipoPostagem">Type</label>
                                <select
                                    id="TipoPostagem"
                                    name="TipoPostagem"
                                    value={tipoPostagem}
                                    onChange={(event) => setTipoPostagem(Number(event.target.value))}
                                >
                                    <option value={0}>Featured_Projects</option>
                                    <option value={1}>Articles</option>
                                    <option value={2}>Psico</option>
                                </select>
                            </div>
                        </div>

                        <button className="admin-button" type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Create'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
