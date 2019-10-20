const bot = require('./bot');
const express = require('express');
const gameInfoRouter = require('./gameInfo');
require('dotenv').config();
const PORT = process.env.PORT||4400;

const GameInfoApi = express();

//game info api on
GameInfoApi.use('/',gameInfoRouter);
GameInfoApi.listen(PORT,err=>{
	if(err) throw err;
	console.log(`Listening on::${PORT}`);
});

//discord bot on
//bot.login(process.env.TOKEN);
