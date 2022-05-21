const { Router } = require('express');
const { getPkmnDB, getPkmnAPI_DB, getPkmnByName, getPkmnByID, createPkmn } = require('../Functions/Pokemon.js')

const router= Router();

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*   

router.get("/", async (req, res, next) => {
    const name = req.query.name;

    if(name){
        const pkmnRequired = await getPkmnByName(name);

        if(pkmnRequired) return res.status(200).send(pkmnRequired);
        else{
            const pkmnByName_DB = await getPkmnDB()
            .then((res)=> res.filter(
                (pkmn) => pkmn.name.toLowerCase().trim() === name.toLowerCase().trim()
                )
            );

            if(pkmnByName_DB.length > 0){
                return res.status(200).send(pkmnByName_DB)
            }else return res.status(404).send('Is it a Digimon?');
        }
    }else {
        try {
            let response = await getPkmnAPI_DB();
            return res.status(200).send(response);
        } catch (error) {
            console.error(error);
            return res.status(404).send("Team Rocket Was Here");
      }
    }
  });

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*   

router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        if(id){
            let PkmnRequired = await getPkmnByID(id);

            if(PkmnRequired){
                return res.status(200).send(PkmnRequired);
            }
            else{
                let pkmnById_DB = await getPkmnDB().then((res)=> 
                    res.filter((pkmn) => pkmn.id === id)
                )
                if(pkmnById_DB.length){
                    return res.status(200).send(pkmnById_DB)
                }else {
                    return res.status(404).send('Pokemon not found');
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
})

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*   

router.post("/", async (req, res, next)=>{
        const{name,height,weight,health,strength,defense,speed,createdInDb,types,sprite } = req.body
        let response = await createPkmn(name,height,weight,health,strength,defense,speed,createdInDb,types,sprite)
        return res.status(200).send(response)
})

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*     

module.exports = router 