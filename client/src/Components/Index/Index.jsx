import React from "react";
import './Index.css'
import { Link } from 'react-router-dom'
import bg from '../../assests/pokedexNDS.png'

export function IndexL(){
    return(
        <div>
            <div className="Image">
                <img className='pkdx' src={ bg } alt='pokedex.png'/>
                <div className="Button">
                    <Link to='/h'>
                        <input className='button' type="button" value="Home" />
                    </Link>
                </div>
                
            </div>
        </div>
        
    )
}

export default IndexL