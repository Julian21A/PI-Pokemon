import React from 'react';
import { NavLink } from 'react-router-dom';
import icon from '../../assests/logo.png'
import './NavBar.css';


export function NavBar() {
    return (
        <header className="navbar">
            <div>
                <NavLink to='/h'>
                    <img id="Pkdex" src={icon} width="120px" height="53px" className="Pkdex" alt="" />
                </NavLink>
            </div>
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <NavLink exact to="/h" >Home</NavLink>
                        <NavLink to="/h/createPokemon" >Create Pokemon</NavLink>
                    </li>
                </ul>
            </nav> 

        </header>
    )
}

export default NavBar