const express = require("express");
// const app = express();
// const cors = require("cors");
// app.use(cors()); 
// 이런식으로도 json파일을 변수명으로 (마치 C언어 구조체처럼)해서 안에 있는 변수들을 불러올 수 있다.
//const Conco = require('./Config.json');
const { token } = require('./config.json');

// Require the necessary discord.js classes
// 요구되는 필요한 discord.js 클래스들 이다. java나 C++의 클래스랑 같은 개념이다.
const { Client, Events, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// 클라이언트가 준비되면 아래의 코드를 실행한다.

// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.

// It makes some properties non-nullable.
// 일부 속성은 null을 허용하지 않음
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
// 클라이언트 토큰으로 디스코드 로그인 시키기
//client.login(Conco.token);
client.login(token);
// ㅇㅇ
// nodemon 사용법 npm run dev
