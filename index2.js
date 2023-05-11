const { Client , Intents , Collection}  = require('discord.js')
const client = new Client({intents:32767})

client.once('ready',()=>{
    console.log(`${client.user.tag}봇이 준비되었습니다`);
})

client.on('messageCreate' , message=>{
  if(message.content == "나 해냈다"){
      message.reply("your work is done!")
  }
})

client.on('messageCreate' , message=>{
  if(message.content == "야"){
      message.reply("호!")
  }
})

client.on('messageCreate' , message=>{
  if(message.content == "이제 일좀하자"){
      message.reply("ㅇㅋ")
  }
})

client.login('MTA4NTUyODA0NjgyMTQ0MTYyNg.Gaazh2.u3U6bEfHvujDZu7pWSuQJyJRvlnB5012OvuJfQ')
//완성코드 (discord.js 13.x.x버전에서만 돌아감 14.x.x버전에선 안돌아감 문법이 다름)