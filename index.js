const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors()); 
const Conco = require('./Config.json');
const Maping = require('./BusLocal.json');

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

var VEHID; // 버스 VehId를 받을 문자열 전역 변수

// 디스코드 봇 명령어 설정
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  console.log(interaction.commandName);
  if(interaction.commandName === 'hey'){
    interaction.reply('hey!');

  } else if(interaction.commandName === 'location'){
    interaction.reply('not yet');

  } else if(interaction.commandName === 'bus'){
    //텍스트 입력 구성 요소 만들기
    const modal=new ModalBuilder()
    .setCustomId('bus VehId')
    .setTitle('내버스 위치찾기');

    const ChasingBus = new TextInputBuilder()
    .setMaxLength(1000)
    .setCustomId('Bus vehId')
    //레이블은 이 입력에 대해 사용자에게 표시되는 프롬프트입니다.
    .setLabel("What's your Bus vehId")
    .setPlaceholder('차량 VehId를 입력해줘~')
    //짧다는 것은 한 줄의 텍스트만 의미합니다.
    .setRequired(true)
    .setStyle(TextInputStyle.Short);
    

    const firstActionRow = new ActionRowBuilder().addComponents(ChasingBus);
    modal.addComponents(firstActionRow);
    await interaction.showModal(modal);

    try{
      client.on(Events.InteractionCreate, interaction => {
        if (!interaction.isModalSubmit()) return;
      
        // Get the data entered by the user
        const busVehId = interaction.fields.getTextInputValue('Bus vehId');
        VEHID = busVehId;
        console.log(VEHID); //전역변수인 VEHID에 차량 ID를 입력받는다.

        interaction.reply('정상적으로 실행되었습니다. 등록하신차량 번호는'+ VEHID +"입니다.");
      });
    } catch{
      interaction.reply('정상적으로 실행되지 않았습니다. 다시 시도해보세요.')
    }

  }
});

// 디스코드 봇 매세지에 대한 반응 설정

client.on('messageCreate', (message) =>{
  console.log(message.content);
  if(message.content === "bus"){
    try{
      var convert = require('xml-js');
      var request = require('request');

      var url = 'http://ws.bus.go.kr/api/rest/buspos/getBusPosByVehId';
      var queryParams = '?' + encodeURIComponent('serviceKey') + '=9mTk0/xkXqrLmNNHjWBa/1miAzFFB9rxSS7KKuTq3FtOvlxeXCNHt6ix0GJvj/oEUnQdzxqBr0fuGEHQ1uARSQ=='; //서비스키인증
      queryParams += '&' + encodeURIComponent('vehId') + '=' + encodeURIComponent(VEHID); 
      
      
      request({
        url: url + queryParams,
        method: 'GET'
      }, function (error, response, body) {
        
        //기본 code
        //console.log('서버응답 200이면 성공임'); 
        //console.log('Status', response.statusCode);
        //console.log('Headers', JSON.stringify(response.headers));
        //console.log('Reponse received', JSON.stringify(body));
        // body 가 xml파일임
        //const myJson = JSON.stringify(body);

        //xml2json을 이용한 파일 변환 
        const result = convert.xml2json(body, {
          compact: true,
          spaces: 3,
        }); 
        
        const myJson = JSON.stringify(result);
        
        //message.reply(`버스 출력 값 = ${JSON.stringify(body)}`);
        console.log('active');
        try{
        const resultObject = JSON.parse(result);
        console.log(resultObject.ServiceResult.msgHeader.headerMsg._text);
        message.reply(`결과메시지 ${resultObject.ServiceResult.msgHeader.headerMsg._text} 
        저상버스(1이면 저상버스 0이면 no): ${resultObject.ServiceResult.msgBody.itemList.busType._text}
        버스ID: ${resultObject.ServiceResult.msgBody.itemList.vehId._text}
        정류소고유ID: ${resultObject.ServiceResult.msgBody.itemList.stId._text}
        최종정류소고유ID: ${resultObject.ServiceResult.msgBody.itemList.lastStnId._text}
        버스차량번호: ${resultObject.ServiceResult.msgBody.itemList.plainNo._text}
        맵매칭GRS80 버스위치x좌표: ${resultObject.ServiceResult.msgBody.itemList.posX._text}
        맵매칭GRS80 버스위치y좌표: ${resultObject.ServiceResult.msgBody.itemList.posY._text}
        정류소도착여부: ${resultObject.ServiceResult.msgBody.itemList.stopFlag._text}
        맵배칭WGS84 버스위치x좌표: ${resultObject.ServiceResult.msgBody.itemList.tmX._text}
        맵배칭WGS84 버스위치y좌표: ${resultObject.ServiceResult.msgBody.itemList.tmY._text}
        구글지도검색 예): (${resultObject.ServiceResult.msgBody.itemList.tmY._text}, ${resultObject.ServiceResult.msgBody.itemList.tmX._text}) 이런식으로 검색하시면 위치가 뜹니다!`);
        } catch{
          message.reply('유효하지 않는 버스 번호를 입력하셨습니다. 다시 /bus 커맨드를 사용해서 버스번호를 입력해주세요');
        }

      });
    } catch{
      message.reply('버스의 위치데이터가 없어요 ㅠㅠ 조금있다가 다시 시도하거나. /bus를 이용해서 다시 차량ID를 입력해주세요ㅠㅠ');
    }
    


  }
});



client.login(Conco.token);