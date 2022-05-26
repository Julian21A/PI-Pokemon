import { 
    GET_ALL_POKEMONS, 
    GET_POKEMON,
    GET_TYPES,
    GET_POKEMON_DETAILS, 
    ORDER_BY_NAME, 
    ORDER_BY_STRENGTH,
    FILTER_ORIGIN,
    FILTER_BY_TYPE,
    CREATE_POKEMON,
    CLEAN,
    CLEAN_DETAIL
  } from "../Actions/actionTypes";


const initialState = {
    pokemonSearch:[],
    allPokemons: [],
    pokemons: [],
    types: [],
    detail: {},
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload,
                pokemons: action.payload
            };
        
        case GET_POKEMON:
            return{
                ...state,
                pokemonSearch: action.payload,
            };
        
        case GET_TYPES:
            return {
                ...state,
                types: action.payload,
            };
        
        case GET_POKEMON_DETAILS:
            return{
                ...state,
                detail: action.payload
            };
        
        case ORDER_BY_NAME:
            let sortedByName;
            if (action.info === "asc") {
                sortedByName = state.allPokemons.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }else return 0;
                });
            }
            if (action.info === "desc") {
                sortedByName = state.allPokemons.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }else return 0;
                });
            }
            if (action.info === "reset") {
                sortedByName = state.allPokemons.sort(function (a, b) {
                    if (a.id > b.id) {
                        return 1;
                    }if (b.id > a.id) {
                        return -1;
                    }else return 0;
                });
            }
            return {
                ...state,
                allPokemons: sortedByName,
            };
        
        case ORDER_BY_STRENGTH:
            let sortedByStrength;
            if (action.info === "stronger") {
                sortedByStrength = state.allPokemons.sort(function (a, b) {
                    if (a.strength > b.strength) {
                        return -1;
                    }if (b.strength > a.strength) {
                        return 1;
                    }else return 0;
                });
            }
            if (action.info === "weaker") {
                sortedByStrength = state.allPokemons.sort(function (a, b) {
                    if (a.strength > b.strength) {
                        return 1;
                    }if (b.strength > a.strength) {
                        return -1;
                    }else return 0;
                });
            }
            if (action.info === "reset") {
                sortedByStrength = state.allPokemons.sort(function (a, b) {
                    if (a.id > b.id) {
                        return 1;
                    }if (b.id > a.id) {
                        return -1;
                    }else return 0;
                });
            }
            return {
                ...state,
                allPokemons: sortedByStrength,
            };
        
        case CREATE_POKEMON:
            return {
                ...state,
            };
           
        case FILTER_ORIGIN:
            const pkmnsGroup1 = state.pokemons;
            let origin;

            if(action.info === "fakemon"){
                origin = pkmnsGroup1.filter((info) => info.createdInDb)
            } else if(action.info === "official") {
                origin = pkmnsGroup1.filter((info) => !info.createdInDb);
            } else if(action.info === "all"){
                origin = pkmnsGroup1
            }

            if (origin.length === 0) window.alert("No Pokemons in the Box");

            return {
                ...state,
                allPokemons: origin.length > 0 ? origin : pkmnsGroup1,
            };

        case FILTER_BY_TYPE:
            const pkmnsGroup = state.pokemons;
            let filterCondition = 
                action.info === "all"
                ? pkmnsGroup
                : pkmnsGroup.filter(
                    (e) =>e.types?.includes(action.info) ||
                    e.Types?.map((e) => (e = e.name)).includes(action.info)
                    );
            if (action.createdApiDb === "official") {
                filterCondition = filterCondition.filter((info) => !info.createdInDb);
            }else if (action.createdApiDb === "fakemon") {
                filterCondition = filterCondition.filter((info) => info.createdInDb);
            }

            if (filterCondition.length === 0) window.alert("No Pokemons in the Box");
                
            return {
                ...state,
               allPokemons: filterCondition.length > 0 ? filterCondition : pkmnsGroup,
            };
        
        case CLEAN:
            return{
                ...state,
                pokemonSearch: action.payload,
            }

        case CLEAN_DETAIL:
            return{
                ...state,
                detail: action.payload,
            }
        
        default: return state
    }
}

export default rootReducer
