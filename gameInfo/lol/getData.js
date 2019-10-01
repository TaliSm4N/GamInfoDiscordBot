const axios = require('axios');
const {URL,KEY} = require('./config.json')

const header = {
	"X-Riot-Token":KEY
}

class getData{
	static async Summoner(name){
		const info = await axios.get(URL['BASE']+URL['SUMMONER']+name,{headers:header})
		return info.data
	}
	static async League(id){
		const league = await axios.get(URL['BASE']+URL['LEAGUE']+id,{headers:header});
		var info={};
		for(var i in league.data){
			if(league.data[i]["queueType"]==="RANKED_SOLO_5x5"){
				var queueType = "solo";
			} else if(league.data[i]["queueType"]==="RANKED_FLEX_SR"){
				var queueType = "flex";
			} else if(league.data[i]["queueType"]==="RANKED_TFT"){
				var queueType = "tft"
			}
			info[queueType] = league.data[i];
			//info[queueType] = await setQueue(league.data[i]);
		}
		return info;
	}
	static async MatchList(id,eIndex){
		const matchList = await axios.get(URL['BASE']+URL['MATCHLIST']+id+"?endIndex="+eIndex,{headers:header})
		let info = matchList.data["matches"];

		return info;
	}

	static async Match(m_id){
		const match = await axios.get(URL['BASE']+URL['MATCH']+m_id,{headers:header})
		let info = match.data;

		return info;
	}
}

module.exports = getData;
