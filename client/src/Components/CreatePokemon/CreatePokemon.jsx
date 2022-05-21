import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getTypes, createPokemon } from '../../Redux/Actions/index';
import './CreatePokemon.css'
import validators from './validator'

export function CreatePokemon(props) {
    
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getTypes())
    },[dispatch])

    let [input, setInput] = useState({
        name: "",
        health: 30,
        strength: 30,
        defense: 30,
        speed: 30,
        height: 30,
        weight: 30,
        types: [],
        sprite:'',
    })

    const [error, setError] = useState({});

    let handleChange = (e) => {
        if(e.target.name === 'types'){
            if(input.types.length<2){
                if(!props.types?.includes(e.target.value)){
                    dispatch(getTypes(e.target.value))
                    setInput({...input, types:[...input.types, e.target.value]})
                }
            }
        }else{
            setInput({...input, [e.target.name] : e.target.value})
        }
        setError(validators({ ...input, [e.target.name]: e.target.value }));
    }

    let handleSubmit = (e) =>{
        e.preventDefault();

        const answer = window.confirm(`${input.name} wants to join into your team`);

        answer
        ? (() => {
            window.alert(`${input.name} joined your team`);
            dispatch(createPokemon(input));
            setInput({
                name: "",health: 30,strength: 30,defense: 30,speed: 30,height: 30,weight: 30,types: [],sprite:'',
            })
        })()
        : (() => {
            window.alert(`${input.name} didn't join your team`);
            setInput({
                name: "",health: 30,strength: 30,defense: 30,speed: 30,height: 30,weight: 30,types: [],sprite:'',
            })
        })();
    };

    return(
        <div className="CP">
        <h1>CREATE POKEMON</h1>

        <form className="CreatePokemon" id="CreatePokemon" onSubmit={(e => handleSubmit(e))}>
            <div className="general">
                <h2 id="Complement">GENERAL DATA</h2>
                <label>Name: </label>
                <input type='text' key={'1'} name="name" value={input.name} placeholder="Who's that Pokemon?" autoComplete={"off"}
                onChange={(e) => handleChange(e)} />
                {error.name && <h6 id='error'>{error.name}</h6>}
                <div className="typesCreate">
                    <label>Types: </label>
                    <br />
                    <select name="types" id="types" onChange={(e) => handleChange(e)}>
                        <option defaultValue={true}>Seleccione Tipo</option>
                        {props.types.map((t) => <option value={t.name} key={t.id}>{t.name}</option>)}    
                    </select>
                    <div className="holi">
                        {input.types.map((t,i) => <span className='typesShow' key={i}> {t} </span>)}
                        {error.types && <h6 id='error'>{error.types}</h6>} 
                    </div>
                    
                </div>
            </div>

            <div className="stat" >
                <h2 id="Complement">STATS</h2>
                <label>Health: </label>
                <input type='number' key={'2'} name='health' value={input.health} min={"1"} max={"255"} 
                onChange={(e) => handleChange(e)}/>
                <label>Strength: </label>
                <input type='number' key={'3'} name='strength' value={input.strength} min={"1"} max={"255"} 
                onChange={(e) => handleChange(e)}/>
                <label>Defense: </label>
                <input type='number' key={'4'} name='defense' value={input.defense} min={"1"} max={"255"} 
                onChange={(e) => handleChange(e)}/>
                <label>Speed: </label>
                <input type='number' key={'5'} name='speed' value={input.speed} min={"1"} max={"255"} 
                onChange={(e) => handleChange(e)}/>
            </div>

            <div className="complement">
                <h2 id="Complement">COMPLEMENTARY</h2>
                <label id="infoC">Height(cm): </label>
                <input id="infoC" type='number'  key={'6'} name='height' value={input.height} min ="1"
                onChange={(e) => handleChange(e)}/>
                <label id="infoC" >Weight(g): </label>
                <input id="infoC" type='number' key={'7'} name='weight' value={input.weight} min ="1"
                onChange={(e) => handleChange(e)}/>
                <div id="errorSpan">
                    {error.height && <h6 id='errorH'>{error.height}</h6>}
                    {error.weight && <h6 id='errorW'>{error.weight}</h6>} 
                </div>
                <div className="spriteArea">
                    <label>Sprite: </label>
                    <div>
                        <input id="sprite" type="url" key={'8'} name='sprite' value={input.sprite} placeholder='Insert Url' autoComplete={"off"} 
                        onChange={(e) => handleChange(e)}/>
                    </div>
                    
                </div>
                
            </div>
            <br />
            
            {error.name || 
                error.types ||
                error.height || 
                error.weight||
                input.name.trim().length === 0? 
                <input id='createButton' className="createButton" type="submit" value="Create Pokemon" disabled={true} /> : 
                <input id='createButton' className="createButton" type="submit" value="Create Pokemon" disabled={false} />
                }
        </form>
        </div>
    )
}

const mapinputToProps = (pokemons)=>{
    return{
      types: pokemons.types,
    }
};
  
const mapDispatchToProps = dispatch => {
    return {
      getTypes: () => dispatch(getTypes()),
      createPokemon: (info) => dispatch(createPokemon(info))
    }
};
  
export default connect(mapinputToProps,mapDispatchToProps)(CreatePokemon)
