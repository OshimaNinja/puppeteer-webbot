const router = require('express').Router({ mergeParams: true });

const Result = require('../get-result');

router.post("/", async (req, res) => {
    try{
        console.log(req.body);
        await Result.getResult({})
        return res.sendStatus(200);
    }catch(error) {
        return res.json({error: error})
    }
    
});

module.exports = router;