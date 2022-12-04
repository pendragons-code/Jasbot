const { warn } = require("../../../src/functions/moderation")
const { db } = require("../../../Loaders/Jasbot.js")
const { DefaultSwear } = require("../../../Loaders/Jasbot.js")
module.exports = {
	name: "AntiSwear",
	async execute(Jasbot, messageCreate, args){
		let swearconfig = await db.get(`swearconfig_${messageCreate.guild.id}`)
		if(swearconfig === null) await db.set(`swearconfig_${messageCreate.guild.id}`, DefaultSwear)
		let warnOnOff = await db.get(`warnonoff_${messageCreate.guild.id}`)
		if(warnOnOff === null) warnOnOff = "off"
		for(i=0;i<swearconfig.length;i++){ 
			if(messageCreate.content.toLowerCase().includes(swearconfig[i])){
				if(warnOnOff === "on") warn(messageCreate.author, `Used vulgar word: ${messageCreate.content}`, 'Jasbot-antiswear')
				messageCreate.channel.send("Anti-swear is on! Please do not swear again!")
				return messageCreate.delete()
			}
		}
	}
}
