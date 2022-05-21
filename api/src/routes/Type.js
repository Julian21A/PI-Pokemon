const { Router } = require('express');
const { getAllTypes } = require('../Functions/Type.js')

const router= Router();

router.get("/", async (req, res, next)=>{
    try {
        let allTypes = await getAllTypes();
        res.json(allTypes)
    } catch (error) {
        res.status(404).semd('Error Types')
    }
})


module.exports = router