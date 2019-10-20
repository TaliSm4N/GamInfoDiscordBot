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
		console.log("league",encodeURI(URL['BASE']+URL['LEAGUE']+id))
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

	static async Mastery(id,cnt){
		console.log(encodeURI(URL['BASE']+URL['MASTERY']+id));
		const mastery = await axios.get(encodeURI(URL['BASE']+URL['MASTERY']+id),{headers:header})
		console.log("mastery")
		const all = await axios.get(encodeURI(URL['BASE']+URL['MASTERY_ALL']+id),{headers:header})
		const cdn = await this.CDN();
		console.log("--------------------")
		console.log("test",cdn.n);
		console.log("--------------------")
		console.log("champion")
		const champ = await axios.get(encodeURI(cdn.cdn+'/'+cdn.n.champion+'/data/ko_KR/champion.json'));
		let champAry = Object.values(champ.data.data);
		/*let champAry = map(champ.data.data,function(value,index){
			let temp = {
				name:value.name,
				key:value.key
			}
			return [temp]
		})*/
		console.log("all",all.data)
		var data = {};
		data.all = all.data;
		data.master=[];
		console.log("test")
		//for(var c of champ.data.data){
		for(var i = 0;i<cnt&&mastery.data.length;i++){
			for(var c of champAry){
				if(mastery.data[i].championId===parseInt(c.key)){
					var temp = {}
					temp.name = c.name
					temp.level = mastery.data[i].championLevel
					temp.point = mastery.data[i].championPoints
					data.master.push(temp)
					break
				}
			}
		}
			/*
		for(var c of champAry){
			if(mastery.data.length==0)
				break;
			for(var i in mastery.data)
			{
				if(mastery.data[i].championId===parseInt(c.key)){
					console.log("i",i)
					var temp = {}
					temp.name = c.name
					temp.level = mastery.data[i].championLevel
					temp.point = mastery.data[i].championPoints
					data.master.push(temp)
					mastery.data.splice(i,1);
					break;
				}
			}
		}
		*/
		/*
		for(var i = 0;i<cnt&&i<mastery.data.length;i++)
		{
			data.master.push(mastery.data[i])
		}
		*/

		return data;
	}

	static async CDN(){
		const cdnData = await axios.get(encodeURI(URL['DATA']));
		console.log("cdn",cdnData)

		return cdnData.data;
	}
	static async Champion(id){
		const cdn = await this.CDN();
		const champ = await axios.get(encodeURI(cdn.cdn+'/'+cdn.n.champion+'/data/ko_KR/champion.json'));
		let champAry = Object.values(champ.data.data);

		for(var c of champAry){
			if(parseInt(c.key)===id){
				console.log("c-----------------",c)
				console.log("-==-p=-=================================================")
				return c
			}
		}
	}
}

module.exports = getData;
