import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from "./components/Header/header";
import Footer from './components/Footer/footer';
import Home from './pages/home/home';
import Projeto from './pages/projeto/projeto';
import ProjetosPagged from './components/ProjetosPagged/projetosPagged';
import Contato from './pages/contato/contato';

export default function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/projeto/:id' element={<Projeto/>}/>
                <Route path='/projetos' element={<ProjetosPagged resum={false} tipo={0}/>}/>
                <Route path='/postagens' element={<ProjetosPagged resum={false} tipo={1}/>}/>
                <Route path='/contatos' element={<Contato/>}/>
                <Route path='/' element={<Home/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}