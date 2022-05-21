const axios = require("axios");
const { Type } = require("../db");

const AddTypesfromApiToDB = async () => {
    try {
        const typeReq= await axios.get("https://pokeapi.co/api/v2/type/");
        const typeRes = typeReq.data.results;

        typeRes.map(({ name })=>{
            Type.create({
                name,
            });
        });
    } catch (error) {
        console.error("Error in AddTypesApi:", error.message);
    }
}
AddTypesfromApiToDB();

const getAllTypes = async () => {
        const result = await Type.findAll();
        return result;
};

module.exports = {
getAllTypes
};