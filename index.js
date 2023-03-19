const { Client, GatewayIntentBits } = require('discord.js');	// discord.js 라이브러리 호출
const client = new Client({ intents: [GatewayIntentBits.Guilds] });	// Client 객체 생성

// discord 봇이 실행될 때 딱 한 번 실행할 코드를 적는 부분
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	console.log(message.content);
});

// 봇과 서버를 연결해주는 부분
client.login('MTA4NTUyODA0NjgyMTQ0MTYyNg.Grfmna.5e7coYeeIrHDBpSVuzPH-gAwaDTnBKV-L7PnaE');