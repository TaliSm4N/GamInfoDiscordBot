const Discord = require('discord.js');
const client = new Discord.Client();
const LOL = require('./lol')
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
					var name = '';
					for(let i = 1; i<args.length;i++)
					{
						name+=args[i]+' ';
					}
					var msg = await LOL.summoner(name);
					message.channel.send({embed:msg});

					//message.channel.send(await LOL.summoner(args[1]));
					break;
			}
			break;
	}
})

client.login(process.env.TOKEN);

module.exports = client;
