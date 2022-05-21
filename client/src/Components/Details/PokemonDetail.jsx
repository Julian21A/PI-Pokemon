import './PokemonDetail.css';
import { getPokemonDetails } from "../../Redux/Actions/index"
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { colours } from "../../assests/Colors"

export function PokemonDetail(props){

    const dispatch = useDispatch();
    
    let params = props.match.params.id

    useEffect(()=> {
        dispatch(getPokemonDetails(params))
    },[dispatch, params])

    return(
        <div className="detailZone">
            {
            props.detail[0] ? (<div>
                <div className='mainInfo'>
                    <h1>#{params} - {props.detail[0].name}</h1>
                </div>
                <div className='back'>
                    <img className='sprite' src={props.detail[0].sprite? props.detail[0].sprite : ("https://i.pinimg.com/originals/a6/4f/c7/a64fc73a5a257f7c6797205bd46d4842.png")} width="350px" height="350px" alt={props.detail.name}/>
                </div>
                <div className='stats'>
                    <h3>Health: {props.detail[0].health}</h3>
                    <h3>Strength: {props.detail[0].strength}</h3>
                    <h3>Defense: {props.detail[0].defense}</h3>
                    <h3>Speed: {props.detail[0].speed}</h3>
                </div>
                <div className='extraInfo'>
                    <h3>height: {props.detail[0].height} cm</h3>
                    <h3>weight: {props.detail[0].weight} g</h3>
                </div>
                <div className='types'>
                    <h3>Types:</h3>
                    <div className='Typeszone'>
                    {props.detail[0].createdInDb ? (
                          <>
                            {props.detail[0].Types?.map((e) => (e = e.name)).map(
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
                          ) : props.detail[0].types?.length ? (
                            props.detail[0].types.map((t, index) => {
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
                    </div>
                </div> 
            </div>):null
            }
        </div>
    )  
    
}

function mapStateToProps(pokemon){
    return{
        detail: pokemon.detail
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        getPokemonDetails: (id) => dispatch(getPokemonDetails(id))
    }
};
  
export default connect(mapStateToProps,mapDispatchToProps)(PokemonDetail);
  
  