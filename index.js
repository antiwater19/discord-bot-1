require('dotenv').config();
const { Client, IntentsBitField, } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const client = new Client({
	intents: [
	  IntentsBitField.Flags.Guilds,
	  // IntentsBitField.Flags.GuildMembers,
	  IntentsBitField.Flags.GuildMessages,
	  IntentsBitField.Flags.MessageContent,
	],
  });

client.on('ready', () => {
	console.log("The bot is online!!")
})

client.login(process.env.TOKEN);