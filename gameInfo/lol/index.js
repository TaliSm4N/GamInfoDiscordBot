const router = require('express').Router();
const axios = require('axios');
const getData = require('./getData')
const {URL,KEY} = require('./config.json');

const header = {
	"X-Riot-Token":KEY
}

router.get('/summoner/:name',async (req,res)=>{
	var data = {}
	//const summoner = await axios.get(URL['BASE']+URL['SUMMONER']+req.params.name,{headers:header});
	const summoner = await getData.Summoner(req.params.name)
	data["name"] = summoner["name"];
	data["icon"] = summoner["profileIconId"];
	data["level"] = summoner["summonerLevel"];
	data["revisionDate"] = summoner["revisionDate"];

	//const league = await axios.get(URL['BASE']+URL['LEAGUE']+summoner["id"],{headers:header});
	const league = await getData.League(summoner["id"])

	data["queue"]=league;

	const matchList = await getData.MatchList(summoner["accountId"],20);
	var c_win=0;
	var c_lose=0;

	for(var match of matchList)
	{
		var m_info = await getData.Match(match["gameId"]);
		if(await winCheck(m_info,summoner["name"]))
			c_win++;
		else
			c_lose++;
	}
	data["current"]={}
	data["current"]["win"]=c_win;
	data["current"]["c_lose"]=c_lose;

	//let queueType = ""

	res.json(data)
	console.log("------------------------")
})

async function winCheck(match,name){
	for(var i in match["participantIdentities"]){
		if(match["participantIdentities"][i]["player"]["summonerName"]===name)
			break;
	}
	if(i<5)
		var team = 0;
	else 
		var team = 1;
	if(match["teams"][team]["win"]==="Win")
		return true;
}

module.exports = router;
