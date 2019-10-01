const axios = require('axios')
const {URL} = require('../config.json')
//require(dotenv).config()

class lol{
	async summoner(name){
		console.log("temp",name)
		//const info = await axios.get(URL['BASE']+':'+process.env.PORT+'/lol/summoner/'+name).data
		//console.log(info)
		return "tt"
		//return name
	}
}

var LOL = new lol()

module.exports = LOL;
