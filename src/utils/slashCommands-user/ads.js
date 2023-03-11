const { db } = require("../../loaders/bot.js")
const { EmbedBuilder } = require("discord.js")
const adPool = require("../../../assets/responseComponents/advertisment.json")
const adList = Object.keys(adPool).map(x => x)
const adRandom =  adList[Math.floor(Math.random() * adList.length)]
module.exports = {
	name: "ads",
	async execute({ bot, interactionCreate }) {
		let slashAdCoolDown = await db.get(`slashAdCoolDown_${interactionCreate.guild.id}_${interactionCreate.user.id}`)
		if(slashAdCoolDown !== null && slashAdCoolDown - (Date.now() - slashAdCoolDown) > 0) return
		const coolDown = 300000
		const results = adPool[adRandom]
		const  AdEmbed = new EmbedBuilder()
		if(results.Site) AdEmbed.setURL(results.Site)
		if(results.Title) AdEmbed.setTitle(results.Title)
		//While i could have just use the other one I made, i decided to make a new one because I am still torn between sending this embed privately or sending this embed as an ephemeral
		await interactionCreate.reply({ embeds: [AdEmbed], ephemeral: true })
		await db.set(`slashAdCoolDown_${interactionCreate.guild.id}_${interactionCreate.user.id}`)
	}
}
