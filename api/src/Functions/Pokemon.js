const axios = require('axios')
const { Pokemon, Type } = require("../db");


 //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*   

 const getPkmnApi = async () => {
    try {
        let pkmnFromAPI = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=48');
        let pkmnFromApi_Url = pkmnFromAPI.data.results.map((pkmn)=> axios.get(pkmn.url));

        let pkmnIndData = await axios.all(pkmnFromApi_Url)
        let pkmns = pkmnIndData.map((pkmn) => pkmn.data);
        let pkmnInfo = pkmns.map((pkmn) => {
            let objPkmn = {
                id: pkmn.id,
                name: pkmn.name,
                strength: Math.floor(pkmn.stats[1].base_stat/2 + pkmn.stats[3].base_stat/2),
                sprite: pkmn.sprites.other['official-artwork'].front_default,
                types: ((pkmn.types.length<2) ? [pkmn.types[0].type.name]: [pkmn.types[0].type.name, pkmn.types[1].type.name])
            }
            return objPkmn;
        })
        return pkmnInfo
    } catch (error) {
        console.error("Error in getPkmnApi:", error.message);
        return error;
    }
}

 //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*   
    
 const getPkmnDB = async () => {
    try {
      return (
        await Pokemon.findAll({
          include: {
            model: Type,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        })
      ).map((pokemon) => {
        let json = pokemon.toJSON();
        return {
          ...json,
          types: json.types?.map((type) => type.name),
        };
      });
    } catch (error) {
      console.error("Error in Database:", error.message);
    }
  };
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*   
    
const getPkmnAPI_DB = async () => {
    try {
        let pokemonApiData = await getPkmnApi();
        let pokemonDbData = await getPkmnDB();
        return [...pokemonApiData, ...pokemonDbData];
    } catch (error) {
        console.error("Error in getPkmnAPI_DB:", error.message);
        return error;
    }
}

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*   
   
const getPkmnByName = async (name) => {
    try {
        let pkmnData = []
        name = name.toLowerCase().trim()

        let pkmnByName = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res)=>res.data);
        pkmnData.push(pkmnByName)
        
        return pkmnData.map((pkmn)=>{
            return{
                id: pkmn.id,
                name: pkmn.name,
                sprite: pkmn.sprites.other['official-artwork'].front_default,
                types: ((pkmn.types.length<2) ? ([pkmn.types[0].type.name]) : [pkmn.types[0].type.name, pkmn.types[1].type.name] )
            }
        })
    }catch (error) {
        console.error("Error in getPkmnByName:", error.message);
    }
}

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*   
   
const getPkmnByID= async (id) => {
    try {
        let pkmnData = []

        let pkmnByName = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res)=>res.data);
        pkmnData.push(pkmnByName)

        return pkmnData.map((pkmn)=>{
            return{
                id: pkmn.id,
                name: pkmn.name,
                health: pkmn.stats[0].base_stat,
                strength: Math.floor(pkmn.stats[1].base_stat/2 + pkmn.stats[3].base_stat/2),
                defense: Math.floor(pkmn.stats[2].base_stat/2 +pkmn.stats[4].base_stat/2),
                speed: pkmn.stats[5].base_stat,
                height: (pkmn.height*10),
                weight: (pkmn.weight/10),
                sprite: pkmn.sprites.other['official-artwork'].front_default,
                types: ((pkmn.types.length<2) ? ([pkmn.types[0].type.name]) : [pkmn.types[0].type.name, pkmn.types[1].type.name] )
            }
        })
    }catch (error) {
        console.error("Error in getPkmnByID:", error.message);
    }
}

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*   

const createPkmn = async (name,height,weight,health,strength,defense,speed,createdInDb,types,sprite)=>{
    try {
        let newPkmn = await Pokemon.create({ name,height,weight,health,strength,defense,speed,createdInDb,sprite });
        await Type.findAll({
            where: { name: types },
        }).then((res)=> newPkmn.addType(res))
        return "Ok, Pokemon Created"
    } catch (error) {
        console.error("Error in createPkmn:", error.message);
    }
}
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*   
   
module.exports = {
    getPkmnDB,
    getPkmnAPI_DB,
    getPkmnByName,
    getPkmnByID,
    createPkmn
}