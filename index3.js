import { Client, GatewayIntentBits } from "discord.js";

// 클라이언트 만들기
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, //for guild
		GatewayIntentBits.GuildMembers, //for guild members
		GatewayIntentBits.GuildMessages, //for guild messages
		GatewayIntentBits.MessageContent, //for access 
	],
});

//봇이 작동하고있는지 터미널로 문자 보내주는거
client.on("봇준비", () => {
	console.log(`> ${client.user.username}`);
});

// now login in bot
client.login('MTA4NTUyODA0NjgyMTQ0MTYyNg.Ghj_EU.KMeQHH6jqy9vTqfDyPyaJuqbZ4UcmRtDjGFw40');
