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
    if(message.content == "푸"){
        message.reply("팩트")
    }
  })

  client.on('messageCreate' , message=>{
    if(message.content == "시진"){
        message.reply("핑!")
    }
  })

  client.on('messageCreate' , message=>{
    if(message.content == "마"){
        message.reply("종환")
    }
  })

  client.on('messageCreate' , message=>{
    if(message.content == "종환이는?"){
        message.reply("진짜멋쟁멋쟁이")
    }
  })

  client.on('messageCreate' , message=>{
    if(message.content == "담은?"){
        message.reply("담다딤담DA딤담다딤담")
    }
  })

  client.on('messageCreate' , message=>{
    if(message.content == "지훈이는?"){
        message.reply("기타기타멋쨍이")
    }
  })

  client.on('messageCreate' , message=>{
    if(message.content == "범수는?"){
        message.reply("게으름뱅이멋쩅이")
    }
  })

  client.on('messageCreate' , message=>{
    if(message.content == "민기는?"){
        message.reply("롤롤롤혼자짜증멋쨍이")
    }
  })

  client.on('messageCreate' , message=>{
    if(message.content == "민수는?"){
        message.reply("와가 아르지사마 다이스키!")
    }
  })

  client.on('messageCreate' , message=>{
    if(message.content == "어?"){
        message.reply("너네집 전자렌지 돌아간는 소리임")
    }
  })


  client.on('messageCreate' , message=>{
    if(message.content == "레알?"){
        message.reply("마드리드?")
    }
  })

  client.on('messageCreate' , message=>{
    if(message.content == "아"){
        message.reply("멘")
    }
  })

  client.on('messageCreate' , message=>{
    if(message.content == "아우"){
        message.reply("멘")
    }
  })

client.login("봇토큰올려놓는곳")
//완성코드 (discord.js 13.x.x버전에서만 돌아감 14.x.x버전에선 안돌아감 문법이 다름)