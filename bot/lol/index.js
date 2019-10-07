const axios = require('axios')
const Discord = require('discord.js')
const getData = require('../../gameInfo/lol/getData')
//const {URL} = require('../config.json')
//require(dotenv).config()

class lol{
	async summoner(name){
		console.log("temp",name)
		var data = {};
		
		const cdnData = await getData.CDN();
		console.log("cdnData-----------",cdnData)
		const summoner = await getData.Summoner(name)
		data["name"]=summoner['name'];
		data['icon']=summoner['profileIconId'];
		data['level']=summoner['summonerLevel'];
		data['revisionDate']=summoner['revisionDate'];

		console.log("summoner")

		var league = await getData.League(summoner.id)
		console.log("league")
		data['queue']=league;
		const matchList = await getData.MatchList(summoner.accountId,20);
		console.log("matchList")
		var c_win=0;
		var c_lose = 0;

		for(var i in matchList){
			var m_info = await getData.Match(matchList[i].gameId);

			if(await winCheck(m_info,summoner.name))
				c_win++;
			else
				c_lose++;
		}
		data['current']={}
		data['current']['win']=c_win;
		data['current']['lose']=c_lose;
		console.log(data)

		var embed = {
			author:{
				name: summoner.name,
				icon_url: cdnData.cdn+'/'+cdnData.n.profileicon+'/img/profileicon/'+summoner.profileIconId+'.png',
			},
			fields:[
				{
					name: 'Level',
					value: summoner.summonerLevel,
					inline:true
				},
				{
					name: '최근 '+(c_win+c_lose)+'게임',
					value: c_win+'승 '+c_lose+'패('+(c_win*100/(c_win+c_lose)).toFixed(2)+'%)',
					inline:true
				},
			]
		}
		if(league.solo===undefined){
			embed.fields.push({
				name:'솔로 랭크',
				value: 'UNRANK',
				inline:true
			})
		} else {
			switch(league.solo.tier){
				case 'IRON':
					embed.color = 0x434b4d
					break;
				case 'BRONZE':
					embed.color = 0x9c5221
					break;
				case 'SILVER':
					embed.color = 0xC2BDB0
					break;
				case 'GOLD':
					embed.color = 0xE7BD42
					break;
				case 'PLATINUM':
					embed.color = 0x07c852
					break;
				case 'DIAMOND':
					embed.color = 0x7955c7
					break;
				case 'MASTER':
					embed.color = 0xf424f8
					break;
				case 'GRANDMASTER':
					embed.color = 0xfe5153
					break;
				case 'CHALLENGER':
					embed.color = 0x47ffff
					break;
			}
			embed.fields.push({
				name:'솔로 랭크',
				value: league.solo.tier+' '+league.solo.rank + ' '+ league.solo.leaguePoints+'LP\n'+
					league.solo.wins+'승 '+league.solo.losses+'패\n' + 
					'승률: '+(league.solo.wins*100/(league.solo.wins+league.solo.losses)).toFixed(2)+'%',
				inline:true
			})
		}

		if(league.flex===undefined){
			embed.fields.push({
				name:'자유 랭크',
				value: 'UNRANK',
				inline:true
			})
		} else {
			embed.fields.push({
				name:'자유 랭크',
				value: league.flex.tier+' '+league.flex.rank + ' '+ league.flex.leaguePoints+'LP\n'+
					league.flex.wins+'승 '+league.flex.losses+'패\n' + 
					'승률: '+(league.flex.wins*100/(league.flex.wins+league.flex.losses)).toFixed(2)+'%',
				inline:true
			})
		}
			/*
		if(league.tft===undefined){
			embed.fields.push({
				name:'TFT',
				value: 'UNRANK',
				inline:true
			})
		} else {
			embed.fields.push({
				name:'TFT',
				value: league.tft.tier+' '+league.tft.rank + ' '+ league.tft.leaguePoints+'LP\n'+
					league.tft.wins+'승 '+league.tft.losses+'패 (' + 
					(league.tft.wins*100/(league.tft.wins+league.tft.losses)).toFixed(2)+'%',
				inline:true
			})
		}
		*/
		embed.thumbnail={}

		embed.thumbnail.url = embed.author.icon_url
		
		console.log("icon----",embed.author.icon_url)
		return embed;
		//return name
	}
}

async function winCheck(match,name){
	for(var i in match.participantIdentities){
		if(match.participantIdentities[i].player.summonerName===name)
			break;
	}
	if(i<5)
		var team = 0;
	else
		var team = 1;
	if(match.teams[team].win==="Win")
		return true;
	else
		return false;
}

var LOL = new lol()

module.exports = LOL;
