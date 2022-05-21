import React from "react";
import "./pokemonCard.css"
import { Link } from "react-router-dom";

export default function PokemonCard({ id, name, types, sprite}){
  
    return(
        
        <div className="CardPkmn">
            <div className="Name">
                <h1>{name.length>10? name.slice(0,10) : name }</h1>
            </div>
            <div className="Types">
                {types}
            </div>
            <div className="bg">
                <Link to={`/h/pokemons/${id}`}>
                    <img className="Photo" src={sprite? sprite : ("https://i.pinimg.com/originals/a6/4f/c7/a64fc73a5a257f7c6797205bd46d4842.png")} width="170px" height="170px" alt={`${name} pic`} />
                </Link>
            </div>
            
        </div>
    )
}