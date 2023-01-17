const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { version, author } = require("../../../../package.json")
module.exports = {
	name: "version",
	aliases: ["-v"],
	category: "core",
	desc: "Sends you some information about the bot and the version of the discord bot!",
	utilisation: "verion",
	async execute(bot, messageCreate, args, mainPrefix) {
		const versionEmbed = new EmbedBuilder()
		versionEmbed.setTitle("Version Details!")
		versionEmbed.setFooter({ text: Default.DefaultFooterText })
		versionEmbed.setURL(Bot.BotSite)
		versionEmbed.setDescription(`Jasbot is currently on ${version}!\n Jasbot is made by: ${author}`)
		versionEmbed.setColor(Default.DefaultEmbedColor)
		versionEmbed.setTimestamp()
		messageCreate.channel.send({ embeds: [versionEmbed] })
		.catch((error) => {
			console.error(error)
			return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
		})
	}
}
