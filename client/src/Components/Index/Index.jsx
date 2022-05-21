import React from "react";
import './Index.css'
import { NavLink } from 'react-router-dom'
import bg from '../../assests/pokedexNDS.png'

export function IndexL(){
    return(
        <div>
            <div className="Image">
                <img className='pkdx' src={ bg } alt='pokedex.png'/>
                <div className="Button">
                    <NavLink to='/h'>
                        <input className='button' type="button" value="Home" />
                    </NavLink>
                </div>
                
            </div>
        </div>
        
    )
}

export default IndexL