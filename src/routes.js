import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from "./components/Header/header";
import Footer from './components/Footer/footer';
import Home from './pages/home/home';
import Projeto from './pages/projeto/projeto';
import ListaProjetos from './components/ListaProjetos/listaProjetos';
import Contato from './pages/contato/contato';
import Repositorio from './pages/repositorio/repositorio';
import Admin from './pages/admin/admin';
import Experiencia from './pages/experiencia/experiencia';

export default function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/projeto/:id' element={<Projeto/>}/>
                <Route path='/repositorio/:id' element={<Repositorio/>}/>
                <Route path='/projetos' element={<main className='pagina'><ListaProjetos pagina/></main>}/>
                <Route path='/postagens' element={<main className='pagina'><ListaProjetos tipo='Articles' pagina/></main>}/>
                <Route path='/contatos/assuntos' element={<Contato usaAssunto={true}/>}/>
                <Route path='/contatos/' element={<Contato usaAssunto={false}/>}/>
                <Route path='/experiencia' element={<Experiencia/>}/>
                <Route path='/admin' element={<Admin/>}/>
                <Route path='/' element={<Home/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}
