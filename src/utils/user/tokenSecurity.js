const { EmbedBuilder } = require("discord.js")
const { Bot } = require("../../../config.json")
module.exports = {
	name: "tokenSecurity",
	async execute(bot, messageCreate, args){
		const embed = new EmbedBuilder()
		embed.setTitle("TOKEN COMPROMISED!!!!")
		embed.setDescription(`message author id: ${messageCreate.author.id}\nmessage author name: ${messageCreate.author.tag}\nguild id: ${messageCreate.guild.id}\nguild name: ${messageCreate.guild.name}\nguild id: ${messageCreate.guild.id}\n message content: ${messageCreate.content}`)
		return bot.users.cache.get(Bot.BotOwnerID).send({ embeds: [embed] })
		.catch((error) => {
			console.error(error)
			return console.log("TOKEN COMPROMISED!")
		})
	}
}
