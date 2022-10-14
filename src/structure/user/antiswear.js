const { defaultfootertext, defaultembedcolour, DefaultSwear } = require("../../../config.json")
const { EmbedBuilder } = require("discord.js")
const { warn } = require("../../functions.js")
const { guildconfigdb } = require("../../../bot.js")
module.exports = {
	name: "antiswear",
	async execute(bot, messageCreate, args, prefix){
		let swearconfig = guildconfigdb.get(`swearconfig_${messageCreate.guild.id}`)
		if(swearconfig === null) swearconfig = DefaultSwear
		let warnonoff = await guildconfigdb.get(`warnonoff_${messageCreate.guild.id}`)
		if(warnonoff === null) warnonoff = "off"

		if(warnonoff === "on"){
			for(i=0;i<swearconfig.length;i++){
				if(messageCreate.content.toLowerCase().includes(swearconfig[i])){
					if(warnonoff === "on") warn(messageCreate.author, `Used vulgar word ${messageCreate.content}`, 'Jasbot-anitswear')
					messageCreate.channel.send("Anti-swear is on! Please do not swear again!")
					return messageCreate.delete()
				}
			}
		}
	}
}
