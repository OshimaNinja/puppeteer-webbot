const router = require('express').Router({ mergeParams: true });

const Result = require('../get-result');

router.post("/", async (req, res) => {
    try{
        console.log(req.body);
        const path = await Result.getResult(req.body);
        return res.json({state: 1, path});
    }catch(error) {
        console.log(error)
        return res.json({error: error})
    }
    
});

module.exports = router;