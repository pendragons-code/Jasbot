const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { version, author } = require("../../../../package.json")
module.exports = {
	name: "version",
	category : "core",
	description: "Sends you the version number this bot is on.",
	utilisation: "version",
	async execute(bot, interactionCreate) {
		const versionEmbed = new EmbedBuilder()
		versionEmbed.setTitle("Version Details!")
		versionEmbed.setFooter({ text: Default.DefaultFooterText })
		versionEmbed.setURL(Bot.BotSite)
		versionEmbed.setTimestamp()
		versionEmbed.setColor(Default.DefaultEmbedColor)
		versionEmbed.setDescription(`Jasbot is currently on ${version}!\n Jasbot is made by: ${author}`)
		messageCreate.channel.send({ embeds: [versionEmbed] })
		.catch((error) => {
			console.error(error)
			return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
		})
	}
}
