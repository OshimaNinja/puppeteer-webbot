const router = require('express').Router({ mergeParams: true });

const Result = require('../get-result');

router.get("/", async (req, res) => {
    await Result.getResult({})
    return res.sendStatus(200);
});

module.exports = router;