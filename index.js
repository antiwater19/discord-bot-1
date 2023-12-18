const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors()); 
const Conco = require('./Config.json');


const { Client, IntentsBitField, AttachmentBuilder, Collection, Events, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalSubmitInteraction, ModalSubmitFields  } = require('discord.js');
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});


client.on('ready', (c) => {
  console.log(`Logged in as ${c.user.tag}!`);
});

var VEHID; // 입력칸에 입력을 받을 문자열 전역 변수

// 디스코드 봇 명령어 설정
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  console.log(interaction.commandName);
  if(interaction.commandName === 'hey'){
    interaction.reply('나불렀니?!');

  } else if(interaction.commandName === 'ping'){
    interaction.reply('Pong!');

  } else if(interaction.commandName === 'input'){
    //interaction.reply('뭐 찾어 또?');
    //텍스트 입력 구성 요소 만들기
    const modal = new ModalBuilder()
      .setCustomId('Input_Data')
      .setTitle('뭐 입력하는 곳');

    const InputBox = new TextInputBuilder()
      .setMaxLength(1000) // 글자 최대길이가 1000이 최대라는 뜻임
      .setCustomId('input_data')
      //레이블은 이 입력에 대해 사용자에게 표시되는 프롬프트입니다.
      .setLabel("Input your data")
      .setPlaceholder('뭐 입력하고 싶은거 있나?')
      //짧다는 것은 한 줄의 텍스트만 의미합니다.
      .setRequired(true)
      .setStyle(TextInputStyle.Short);
    

    const firstActionRow = new ActionRowBuilder().addComponents(InputBox);
    modal.addComponents(firstActionRow);
    await interaction.showModal(modal);
    
    try{
      client.on(Events.InteractionCreate, interaction => {
        if (!interaction.isModalSubmit()) return;
      
        // Get the data entered by the user
        const busVehId = interaction.fields.getTextInputValue('Input_Data');
        VEHID = busVehId;
        console.log(VEHID); //전역변수인 VEHID에 차량 ID를 입력받는다.

        interaction.reply('정상적으로 실행되었습니다. 등록하신차량 번호는'+ VEHID +"입니다.");
      });
    } catch{
      interaction.reply('정상적으로 실행되지 않았습니다. 다시 시도해보세요.')
    }

  } else if (interaction.commandName === 'today'){
    interaction.reply(`오늘의 민수 pick: ${Conco.GOD}`);
  }

});

// 디스코드 봇 매세지에 대한 반응 설정

client.on('messageCreate', (message) =>{
  console.log(message.content);
  if(message.content === "오우야"){
    try{
      message.reply('오우야~');
      } catch{
      message.reply('ㅗㅜㅑ');
    }
  }
  if(message.content === "안녕?"){
    message.reply('안녕? >ㅅ<');
  }
});

 

client.login(Conco.token);