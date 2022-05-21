import axios from "axios";
import { 
  GET_ALL_POKEMONS, 
  GET_POKEMON,
  GET_TYPES,
  GET_POKEMON_DETAILS, 
  ORDER_BY_NAME, 
  ORDER_BY_STRENGTH,
  FILTER_ORIGIN,
  FILTER_BY_TYPE,
  CREATE_POKEMON 
} from "./actionTypes";

export function getAllPokemons(){
  return async function (dispatch) {
   try {
      return fetch(`http://localhost:3001/pokemons`)
        .then(r => r.json())
        .then(json => dispatch(
          {
            type: GET_ALL_POKEMONS,
            payload: json
          }));
   } catch (error) {
     console.error(error)
   }
    
  };
};

export function getPokemon(name) {
  return async function(dispatch) {
    try {
      const response = await fetch(`http://localhost:3001/pokemons?name=${name}`);
      const json = await response.json();
        return dispatch({
          type: GET_POKEMON,
          payload: json
        });
    } catch (error) {
      console.error(error)
    }
  };
};

export function getTypes() {
  return async function (dispatch) {
    try {
      return await fetch(`http://localhost:3001/types`)
      .then(r => r.json())
      .then(json => dispatch(
        {
          type: GET_TYPES, 
          payload: json
        }));
    } catch (error) {
      console.error(error);
    }
  };
};

export function getPokemonDetails(id){
  return async function (dispatch) {
    try {
      return  await fetch(`http://localhost:3001/pokemons/${id}`)
      .then(r => r.json())
      .then(json => dispatch(
        {
          type: GET_POKEMON_DETAILS,
          payload: json
        }));
    } catch (error) {
       console.error(error)
    }
  };
};

export function orderByName(info) {
  return {
    type: ORDER_BY_NAME,
    info,
  };
};

export function orderByStrength(info) {
  return {
    type: ORDER_BY_STRENGTH,
    info,
  };
};

export function filterOrigin(info) {
  return {
    type: FILTER_ORIGIN,
    info,
  };
};

export function filterTypes(info, createdApiDb) {
  return {
    type: FILTER_BY_TYPE,
    info,
    createdApiDb,
  };
};

export function createPokemon(info){
  return async function (dispatch) {
    try {
      const response = await axios.post(`http://localhost:3001/pokemons`,info);
      dispatch({ 
        type: CREATE_POKEMON, 
        payload: response 
      });
    } catch (error) {
      console.error("Error in action createPokemon:", error.message);
    }
  };
};