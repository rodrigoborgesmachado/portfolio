import ThemeSwitcher from "../themeSwitcher/themeSwitcher"
import { useNavigate } from 'react-router-dom';

import './header.css'

export default function Header(){
    const navigate = useNavigate();

    return(
        <header className="navBar">
            <h2 className="option-link" onClick={()=>navigate(`/`, {replace: true})}>Rodrigo Machado</h2>
            <div className="navBar-options">
                <ThemeSwitcher/>
                <h3 className="option-link" onClick={()=>navigate(`/contatos`, {replace: true})}>Contato</h3>
            </div>
        </header>
    )
}