import React, { useEffect, useState } from "react";
import './Home.css'
import PokemonCard from "../Cards/pokemonCard.jsx"
import { filterOrigin, filterTypes, getAllPokemons, getTypes, orderByName, orderByStrength } from "../../Redux/Actions/index"
import { connect, useDispatch } from "react-redux";
import Buscador from '../Searcher/Searcher'
import PageSystem from "../Pagination/Pagination";
import loader from '../../assests/pikachu-running.gif'
import { colours } from "../../assests/Colors"

export function Home(props){
  
  const dispatch = useDispatch();

  const [actualPage, setactualPage] = useState();
  const [pkmnPerPage] = useState(12);
  const [, setOrden] = useState("");

  let local = localStorage.getItem("page");

  useEffect(() => {
      if (local !== null) {
        setactualPage(Number(local));
      }
  }, [local]);

  const indexOfLastPkmn = actualPage * pkmnPerPage;
  const indexOfFirstPkmn = indexOfLastPkmn - pkmnPerPage;
  const actualPkmns = props.allPokemons.slice(indexOfFirstPkmn, indexOfLastPkmn);

  const paginate = (pageNumber) => setactualPage(pageNumber);

  useEffect(()=> {
    dispatch(getAllPokemons())
    dispatch(getTypes())
  },[dispatch])

  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrden(`Ordered ${e.target.value}`);
  }

  function handleSortStrength(e) {
    e.preventDefault();
    dispatch(orderByStrength(e.target.value));
    setOrden(`Ordered ${e.target.value}`);
  }

  function handleFilterOrigin(e) {
    dispatch(filterOrigin(e.target.value));
  }

  function handleFilterByType(e) {
    e.preventDefault();
    let createdApiDb = document.getElementById("createdApiDb").value;
    dispatch(filterTypes(e.target.value, createdApiDb)); 
  }

  return(
      <div className="navigate">
        {!actualPkmns.length ? (
            <></>):(
          <Buscador/>
        )}
        {!actualPkmns.length ? (
          <></>):(
          <div className="organizer">
            <select className="expand" id='Alphabetic' onChange={(e) => handleSortName(e)} >
            <option defaultValue='null' hidden selected>- Order By Name -</option>
              <option value="asc"> A-Z </option>
              <option value="desc"> Z-A </option>
              <option value="reset">Default Order</option>
            </select>

            <select className="expand" id='Strength' onChange={(e) => handleSortStrength(e)}>
              <option defaultValue='null' hidden selected>- Order By Strength -</option>
              <option value="stronger">Stronger</option>
              <option value="weaker">Weaker</option>
              <option value="reset">Default Order</option>
            </select>

            <select className="expand" id="allTypes" onChange={(e) => {handleFilterByType(e);}}>
              <option defaultValue='null' hidden selected>- Filter By Types -</option>
              <option value="all">All Types</option>
              {props.types?.map((e) => (
                <option key={e.id} value={e.name}>{e.name}</option>
              ))}
            </select>

            <select className="expand" id="createdApiDb" onChange={(e) => handleFilterOrigin(e)}>
              <option defaultValue='null' hidden selected>- Filter By Origin -</option>
              <option value="all">All Pokemons</option>
              <option value="official">Official Pokemons</option>
              <option value="fakemon">Fakemons</option>
            </select>

            <div className="pageModule">
              <PageSystem
              pkmnPerPage={pkmnPerPage}
              totalPkmn={props.allPokemons.length}
              paginate={paginate}
              actPage={actualPage}
            />
            </div>
              
          </div>
        )}   
          
          <div className="monsterZone">
              {actualPkmns.length > 0 ? (
                actualPkmns.map((p, index) => {
                  return typeof p === "string" ? (
                    <h2 key={index} style={{ gridColumn: "none" }}>
                      Pokemon with the name {p} was not found :/
                    </h2>
                  ) : (<PokemonCard
                      key = {p.id}
                      id = {p.id}
                      name = {p.name}
                      sprite = {p.sprite}
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
                            <h6>unknown</h6>
                        )}
                  />);
              })
            ) : (
              <div className="loader">
                <img  src={loader} width="215px" height="156px" alt="run" />
                <div className="little">
                  <h4>...Loading...</h4>
                </div>
              </div>
              
            )}
          </div>           
      </div>
  )
  
}
const mapStateToProps = (pokemons)=>{
    return{
      allPokemons: pokemons.allPokemons,
      types: pokemons.types
    }
};
  
const mapDispatchToProps = dispatch => {
    return {
      getAllPokemons: () => dispatch(getAllPokemons())
    }
};
  
export default connect(mapStateToProps,mapDispatchToProps)(Home)
