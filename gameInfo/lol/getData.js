const axios = require('axios');
const {URL,KEY} = require('./config.json')

const header = {
	"X-Riot-Token":KEY
}

class getData{
	static async Summoner(name){
		console.log("in summoner")
		console.log(name)
		const info = await axios.get(encodeURI(URL['BASE']+URL['SUMMONER']+name),{headers:header})
		return info.data
	}
	static async League(id){
		const league = await axios.get(encodeURI(URL['BASE']+URL['LEAGUE']+id),{headers:header});
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
		console.log("get matchList")
		console.log(URL['BASE']+URL['MATCHLIST']+id+"?endIndex="+eIndex)
		const matchList = await axios.get(encodeURI(URL['BASE']+URL['MATCHLIST']+id+"?endIndex="+eIndex),{headers:header})
		let info = matchList.data["matches"];

		return info;
	}

	static async Match(m_id){
		//		console.log("match")
		const match = await axios.get(encodeURI(URL['BASE']+URL['MATCH']+m_id),{headers:header})
		let info = match.data;

		return info;
	}

	static async CDN(){
		const cdnData = await axios.get(encodeURI(URL['DATA']));
		console.log("cdn",cdnData)

		return cdnData.data;
	}
}

module.exports = getData;
