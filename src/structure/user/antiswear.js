const { DefaultSwear } = require("../../../config.json")
const { warn } = require("../../functions.js")
const { guildconfigdb } = require("../../../bot.js")
module.exports = {
	name: "antiswear",
	async execute(bot, messageCreate){
		let swearconfig = await guildconfigdb.get(`swearconfig_${messageCreate.guild.id}`)
		if(swearconfig === null || swearconfig.length === null) await guildconfigdb.set(`swearconfig_${messageCreate.guild.id}`, DefaultSwear)
		let warnonoff = await guildconfigdb.get(`warnonoff_${messageCreate.guild.id}`)
		if(warnonoff === null) warnonoff = "off"
		let cusscheck = await guildconfigdb.get(`cuss_${messageCreate.guild.id}`)
		if(cusscheck === null) cusscheck === "off"
		if(cusscheck === "off" || cusscheck === null) return
		for(i=0;i<swearconfig.length;i++){ 
			if(messageCreate.content.toLowerCase().includes(swearconfig[i])){
				if(warnonoff === "on") warn(messageCreate.author, `Used vulgar word: ${messageCreate.content}`, 'Jasbot-antiswear')
				messageCreate.channel.send("Anti-swear is on! Please do not swear again!")
				return messageCreate.delete()
			}
		}
	}
}
