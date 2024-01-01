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
        const busVehId = interaction.fields.getTextInputValue('input_data');
        // getTextInputValue가 TextInputBuilder()의 customId랑 맞춰야 한다.
        VEHID = busVehId;
        console.log(VEHID); //전역변수인 VEHID에 입력정보를 받는다.

        interaction.reply("정상적으로 실행되었습니다. 입력하신 정보는["+ VEHID +"]입니다.");
      });
    } catch{
      interaction.reply('정상적으로 실행되지 않았습니다. 다시 시도해보세요.')
    }

  } else if (interaction.commandName === 'today'){
    interaction.reply(`오늘의 민수 pick: ${Conco.GOD}`);
  } else if (interaction.commandName === 'game1'){
    //interaction.reply(`가위바위보 시작!`);
    const modal = new ModalBuilder()
      .setCustomId('RockPaperScissors')
      .setTitle('당신은 무엇을 낼건가요?');

    const RockPaperScissors = new TextInputBuilder()
      .setMaxLength(1000) // 글자 최대길이가 1000이 최대라는 뜻임
      .setCustomId('your_turn')
      .setLabel("Input your data")
      .setPlaceholder('가위(1), 바위(2), 보(3)')
      .setRequired(true)
      .setStyle(TextInputStyle.Short);
    

    const firstActionRow = new ActionRowBuilder().addComponents(RockPaperScissors);
    modal.addComponents(firstActionRow);
    await interaction.showModal(modal);
    
    try{
      client.on(Events.InteractionCreate, interaction => {
        if (!interaction.isModalSubmit()) return;
        
        // Get the data entered by the user
        const Player = interaction.fields.getTextInputValue('your_turn');
        console.log(Player);

        //봇이 내는 랜덤가위바위보 만들기.1~3까지 랜덤 뽑기
        const RandomBot = Math.floor(Math.random()*(3-1)+1);

        //1부터 3까지 랜덤 변수를 만든다.
        /*switch(randombot){
          case 1:
            interaction.reply(`나는 가위! 너는 ${Player}`);
            break;
          case 2:
            interaction.reply(`나는 바위! 너는 ${Player}`);
            break;
          case 3:
            interaction.reply(`나는 보! 너는 ${Player}`);
            break;
        }*/

        // 엄격하게 같다 (변수타입까지고려)'===', 그냥 같다. '=='
        if(RandomBot == Player){
          interaction.reply(`무승부!`);
        } else if((RandomBot == 1 && Player == 2)||(RandomBot == 2 && Player == 3)||(RandomBot == 3 && Player == 1)){
          interaction.reply(`You are Winner!`);
        } else if((RandomBot == 1 && Player == 3)||(RandomBot == 2 && Player == 1)||(RandomBot == 3 && Player == 2)){
          interaction.reply(`You are Loserㅋㅋ`);
        }

      });
    } catch{
      interaction.reply('앗차 미안 내가 못봤는데... 다시 해줄레??ㅠㅠ')
    }
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

 
// nodemon 사용법 npm run dev
client.login(Conco.token);