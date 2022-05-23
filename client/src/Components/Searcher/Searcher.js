import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Searcher.css';
import { getPokemon } from '../../Redux/Actions/index.js'
import SearchCard from "../Cards/SearchCard.js"
import { colours } from "../../assests/Colors"

export default function Searcher(props) {

    const pokemon= useSelector((state) => state.pokemonSearch)
    
    const dispatch = useDispatch()

    const [input, setInput]= useState('')

    function handleChange(event) {
        setInput(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getPokemon(input))
    }

    return(
        <div>
            <form className="searcher" onSubmit = {(e) => handleSubmit(e)}>
                <div className='Explorer'><h4>Pokemon's Explorer</h4></div>
        
                <div>
                    <input
                        className='TextInput'
                        type="text"
                        id="pokemon"
                        autoComplete="off"
                        placeholder="Pokemon Name..."
                        value={input}
                        onChange = {(e)=> handleChange(e)}
                    />
                </div>
                <input className="Search" type="submit" value="Search" />
            </form>
            <div className="result">
                <ul>
                    {pokemon.map((p)=> {
                        return(
                            <SearchCard
                                key = {p.id}
                                id = {p.id}
                                name = {p.name}
                                sprite = {p.sprite? p.sprite : ("https://i.pinimg.com/originals/a6/4f/c7/a64fc73a5a257f7c6797205bd46d4842.png")}
                                types = 
                                    {p.createdInDb ? (
                                        <>
                                        {p.Types?.map((e) => (e = e.name)).map(
                                            (t, index) => {
                                            return (
                                                <p 
                                                key={index}
                                                style={{ backgroundColor: `${colours[t]}` }}>
                                                    {t}
                                                </p>);
                                            }
                                        )}
                                        </>
                                        ) : p.types?.length ? (
                                        p.types.map((t, index) => {
                                            return (
                                                <p
                                                key={index}
                                                style={{ backgroundColor: `${colours[t]}`,}}
                                                >
                                                {t}
                                                </p>);
                                        })
                                        ) : (
                                        <p>unknown</p>
                                    )}
                            />
                    )})}
                </ul> 
            </div>
        </div>
    )
}

