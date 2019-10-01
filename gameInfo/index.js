const lolRouter = require('./lol');
const router = require('express').Router(); 

router.use('/lol',lolRouter);

module.exports = router;
