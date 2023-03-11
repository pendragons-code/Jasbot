const { Default } = require("../../../config.json")
const { db } = require("../../loaders/bot.js")
const { EmbedBuilder } = require("discord.js")
const reject = require("../../../assets/responseComponents/rejection.json")
const interactionCreate = require("../../events/guilds/interactionCreate.js")
module.exports = {
	name: "NewUserSlash",
	async execute({ bot, interactionCreate }) {
	const NewUserEmbed = new EmbedBuilder()
	NewUserEmbed.setTitle("Hello there new user!")
	NewUserEmbed.setDescription("Hello there new user! I am Jasbot, a simple discord bot made by PENDRAGON#8785! I am messaging to let you know that this is the first time you are using this bot and that should there be any issues do not hesitate to reach out to the developer! I hope that you continue to use me, a really tiny bot and support my work along the way! Every user means a lot to me, so thank you very much!")
	NewUserEmbed.setFooter({ text: Default.DefaultFooterText })
	NewUserEmbed.setColor(DefaultEmbedColor)
	db.set(`NewUser_${interactionCreate.user.id}`, "SentNewUserMessage")
	.catch((error) => {
		console.error(error)
		return interactionCreate.reply({ content: reject.WeAreScrewed.ExecutionError })
	})
	return interactionCreate.user.send({ embeds: [NewUserEmbed] })
	.catch((error) => {
		console.error(error)
		return interactionCreate.reply({ embeds: [NewUserEmbed] })
	})
	}
}
