const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
module.exports = {
	name: "link",
	category: "core",
	description: "Sends a link to add the discord bot.",
	utilisation: "link",
	async execute(bot, interactionCreate) {
		const linkEmbed = new EmbedBuilder()
		linkEmbed.setTitle("Please add the bot :)!")
		linkEmbed.setColor(Default.DefaultEmbedColor)
		linkEmbed.setFooter({ text: Default.DefaultFooterText })
		linkEmbed.setURL(Bot.BotSite)
		linkEmbed.setDescription("Adding this bot to your server means a lot to me! It took some time to make this bot and I hope you like it!")
		const addBotButton = new ButtonBuilder()
		addBotButton.setLabel("Add the bot!")
		addBotButton.setCustomId(JSON.stringify({ ffb: "addBot" }))
		addBotButton.setStyle("Primary")
		const row1 = new ActionRowBuilder().addComponents(addBotButton)
		interactionCreate.reply({ embeds: [linkEmbed], components: [row1], ephemeral: true })
	}
}
