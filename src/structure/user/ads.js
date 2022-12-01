const { EmbedBuilder } = require("discord.js")
const { guildconfigdb } = require("../../../bot.js")
const adpool = require("../../../assets/items/advertisments.json")
const adlist = Object.keys(adpool).map(x => x)
const adRandom =  adlist[Math.floor(Math.random() * adlist.length)]
module.exports = {
	name: "ads",
	async execute(bot, messageCreate, args, prefix){
		//advertisement cooldown
		const ms = await import("parse-ms")
		let cooldown = 600000
		let adCooldown = await guildconfigdb.get(`adCooldown_${messageCreate.guild.id}`)
		if(adCooldown !== null && cooldown - (Date.now() - adCooldown) > 0) return
		const embed = new EmbedBuilder()
		if(adpool[adRandom].Site) embed.setURL(adpool[adRandom].Site)
		if(adpool[adRandom].Socials.Combined) embed.addFields({ name: "Socials", value: adpool[adRandom].Socials.Combined, inline: true })
		if(adpool[adRandom].Image) embed.setImage(adpool[adRandom].Image)
		if(!adpool[adRandom].Footericon && adpool[adRandom].Footer) embed.setFooter({ text: adpool[adRandom].Footer })
		if(adpool[adRandom].Footericon && adpool[adRandom].Footer) embed.setFooter({ text: adpool[adRandom].Footer, iconURL: adpool[adRandom].Footericon })
		//Remember to add checking method for fields up till 25
		if(adpool[adRandom].Fields.one) embed.addFields({ name: adpool[adRandom].Fields.one.name, value: adpool[adRandom].Fields.one.value, inline: true})
		embed.setDescription(adpool[adRandom].Description)
		embed.setColor(adpool[adRandom].Colour)
		embed.setTitle(adpool[adRandom].Title)
		embed.setTimestamp()
		messageCreate.channel.send({ embeds: [embed] })
		guildconfigdb.set(`adCooldown_${messageCreate.guild.id}`, Date.now())
		let time = ms.default(cooldown - (Date.now - adCooldown))
		console.log(time)
	}
}
