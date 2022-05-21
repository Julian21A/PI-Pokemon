import React from "react";
import "./SearchCard.css"
import { Link } from "react-router-dom";

export default function SearchCard({ id, name, types, sprite}){
  
    return(
        
        <div className="CardSearch">
            <div className="areaid">
                <Link className="idpkmn" to={`/h/pokemons/${id}`}>
                    <h1>#{id.length>4? id.slice(0,4): id}</h1>
                </Link>
            </div>
            <div className="areaname" >
                <Link className="namepkmn" to={`/h/pokemons/${id}`}>
                    <h1>{name.length>9? name.slice(0,10): name}</h1>
                </Link>
                <div className="typespkmn">
                    {types}
                </div>
            </div>
            <Link to={`/h/pokemons/${id}`}>
                <img className="spritepkmn" src={sprite} width="90px" height="90px" alt={"Pokemon Pic"} />
            </Link>
        </div>
    )
}