const { EmbedBuilder } = require("discord.js")
const { db } = require("../../loaders/bot.js")
const adPool = require("../../../assets/responseComponents/advertisment.json")
const adList = Object.keys(adPool).map(x => x)
const adRandom =  adList[Math.floor(Math.random() * adList.length)]
module.exports = {
	name: "ads",
	async execute(bot, messageCreate, args) {
		const adEmbed = new EmbedBuilder()
		const ms = await import("parse-ms")
		let cooldown = 3600000
		let adCooldown = await db.get(`adCooldown_${messageCreate.guild.id}`)
		if(adCooldown !== null && cooldown - (Date.now() - adCooldown) > 0) return
		let time = ms.default(cooldown - (Date.now - adCooldown))
		let results = adPool[adRandom]
		if(results.Site) adEmbed.setURL(results.Site)
		if(results.Socials.Combined) adEmbed.addFields({ name: "Socials", value: results.Socials.Combined, inline: true })
		if(results.Image) adEmbed.setImage(results.Image)
		if(!results.Footericon && results.Footer) adEmbed.setFooter({ text: results.Footer })
		if(results.Footericon && results.Footer) adEmbed.setFooter({ text: results.Footer, iconURL: results.Footericon })
		if(results.Fields.one) adEmbed.addFields({ name: results.Fields.one.name, value: results.Fields.one.value, inline: true })
		adEmbed.setDescription(results.Description)
		adEmbed.setColor(results.Colour)
		adEmbed.setTitle(results.Title)
		adEmbed.addFields({ name: `Time left!`, value: `${time.hours} hours, ${time.minutes} mins and ${time.seconds} secs left`, inline:true })
		adEmbed.setTimestamp()
		await messageCreate.channel.send({ embeds: [adEmbed] })
		await db.set(`adCooldown_${messageCreate.guild.id}`, Date.now())
	}
}
