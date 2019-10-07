const Discord = require('discord.js');
const client = new Discord.Client();
const LOL = require('./lol')
//const {prefix, token} = require('./config.json');
require('dotenv').config();

client.once('ready',()=>{
	console.log('Ready!');
});

client.on('message', async (message)=>{
	console.log(message)
	console.log(process.env.PREFIX)
	if(!message.content.startsWith(process.env.PREFIX)||message.author.bot) return;

	const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
	const command = args.shift().toLowerCase();
	console.log("args",args)
	console.log("command",command)

	switch(command){
		case 'lol':
		case '롤' :
			//message.channel.send('test');
			switch(args[0])
			{
				case 'id':
				case 'i':
					var embedMsg = await LOL.summoner(args[1]);
					message.channel.send({embed:embedMsg});

					//message.channel.send(await LOL.summoner(args[1]));
					break;
			}
			break;
	}
})

//client.login(token);

module.exports = client;
