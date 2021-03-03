const Discord = require("discord.js");

module.exports = {
  name: "임베드",
  aliases: ["embed", "임배드", "embeded"],
  description:
    "임베드에 씌워진 공지를 보내요.",
  usage: ",embed <공지 내용>",
  run: async (client, message, args) => {
    let inc = args[1].replace('<#','').replace('>','');
    if ((!message.member.roles.cache.has("698618859480940604")) || (!message.member.roles.cache.has("700654413857161266")) || (!message.member.roles.cache.has("704003304992145441")) || (!message.member.roles.cache.has("816462860879134731"))){
      return message.reply("관리자 권한이 없는 사람은 이 명령어를 실행할 수 없습니다.").then(m => m.delete(5000));
    }
    if (inc == null || undefined || "") return message.channel.send("공지를 보낼 채널을 `,채널설정 [채널ID]`를 통해 설정해주세요.")
    if (!args[1]) return message.channel.send("공지 내용을 입력해주세요.");
    const embed = new Discord.MessageEmbed()
      .setTitle("공지를 임베드로 보낼까요?")
      .setColor("#303135")
      .addField("공지 내용", `\`\`\`\n${args.slice(1).join(" ")}\n\`\`\``)
    let m = await message.channel.send({
      embed: embed,
    });
    await m.react("✅");
    await m.react("❌");
    const filter = (r, u) =>
      u.id == message.author.id &&
      (r.emoji.name == "✅" || r.emoji.name == "❌");
    const collector = m.createReactionCollector(filter, {
      max: 1,
    });
    collector.on("end", async (collected) => {
      if (collected.first().emoji.name == "✅") {
        client.channels.cache.get(inc).send("",{
          embed: new Discord.MessageEmbed()
              .setTitle(`${message.guild.name} 공지`)
              .setDescription(args.slice(1).join(" "))
              .setColor("#303135")
          });
        embed.setTitle("공지를 보냈어요.").setColor("#303135")
        await m.edit({
          embed: embed,
        });
      } else {
        embed
          .setTitle("공지 전송이 취소되었어요.")
          .setColor("#303135")
        m.edit({
          embed: embed,
        });
      }
    });
  },
};