const Discord = require('discord.js');
const ops = require('../info.json');
const fs = require('fs')

module.exports = {
    name: '채널설정',
    aliases: ['setting', '설정', '채널', '채설', 'channel'],
    description: '봇의 도움말을 볼 수 있어요.',
    usage: ',채널설정 [채널 아이디]',
    run: async (client, message, args) => {
        let inc = {
            "noticeChannel" : ""
        };
        if(!args[1]) return message.channel.send("채널의 ID를 적어주세요.")
        inc.noticeChannel = args[1];
        const data = JSON.stringify(inc);
        fs.writeFile('../info.json', data, (err) => {
            if(err) {
                message.channel.send(`오류 발생 : ${err}`)
            } else {
                message.channel.send("채널 세팅이 완료되었어요!")
            }
        })
        const ops2 = require('../info.json')
        console.log(ops2)
    }
}
