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
    if(message.content == "메자메타마에"){
        message.reply("하잇@! 고쥬신 사마!!!>ㅅ<")
    }
  })

  client.on('messageCreate' , message=>{
    if(message.content == "사라져랏"){
        message.reply("okay turn off")
    }
  })


client.login("MTA4NTUyODA0NjgyMTQ0MTYyNg.Gqv6pf.Khw0PRZD6FL3CPJWO5HwY-zLyzXlok-9_u3zpY")