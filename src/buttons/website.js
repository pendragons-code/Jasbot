const { Bot, Default } = require("../../config.json")
const { EmbedBuilder } = require("discord.js")
module.exports = async ({ bot, interactionCreate }) => {
	const embed = new EmbedBuilder()
	embed.setTitle("List of useful sites!")
	embed.setURL(Bot.BotSite)
	embed.addFields(
		{ name: "Bot's site!", value: `[Click Me!](${Bot.BotSite})` },
		{ name: "Portfolio", value: "[Click Me!](https://code.pendragonscode.xyz)" }
	)
	embed.setColor(Default.DefaultEmbedColor)
	embed.setTimestamp()
	embed.setFooter({ text: Default.DefaultFooterText })
	return interactionCreate.reply({ embeds: [embed], ephemeral: true})
}
