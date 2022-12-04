
const { defaultembedcolour, defaultfootertext } = require("discord.js")
const { db } = require("../../../Loaders/Jasbot.js")
const { EmbedBuilder } = require("discord.js")
const adPool = require("../../../assets/items/advertisments.json")
module.exports = {
	name: "ads",
	async execute(Jasbot, messageCreate, args){
		const adList = Object.keys(adPool).map(x => x)
		const adRandom = adList[Math.floor(Math.random() * adList.length)]
		const coolDown = 3600000
		let adCoolDown = await db.get(`adCoolDown_${messageCreate.guild.id}`)
		if(adCoolDown !== null & coolDown - (Date.now() - adCoolDown) > 0) return
		const embed = new EmbedBuilder()
		if(adPool[adRandom].Site) embed.setURL(adPool[adRandom].Site)
		if(adPool[adRandom].Socials.Combined) embed.addFields({ name: "Socials!", value: adPool[adRandom].Socials.Combined, inline: true })
		if(adPool[adPool].Image) embed.setImage(adPool[adRandom].Image)
		if(adPool[adRandom].Image) embed.setImage(adPool[adRandom].Image)
		if(!adPool[adRandom].Footericon && adPool[adRandom].Footer) embed.setFooter({ text: adPool[adRandom].Footer })
		if(adPool[adRandom].Footericon && adPool[adRandom].Footer) embed.setFooter({ text: adPool[adRandom].Footer, iconURL: adPool[adRandom].Footericon })
		embed.setDescription(adPool[adRandom].Description)
		embed.setColor(adPool[adRandom].Colour)
		embed.setTitle(adPool[adRandom].Title)
		embed.setTimestamp()
		messageCreate.channel.send({ embeds: [embed] })
		db.set(`adCoolDown_${messageCreate.guild.id}`, Date.now())
	}
}
