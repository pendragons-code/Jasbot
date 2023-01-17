const { db } = require("../../../loaders/bot.js")
const { EmbedBuilder } = require("discord.js")
const { getUserFromMention } = require("../../../functions/mentions/users.js")
const { Default, Bot } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "cmdran",
	aliases: [],
	category: "utility",
	desc: "Fetches the number of commands this user has ran!",
	utilisation: "cmdran <@user>",
	async execute(bot, messageCreate, args, mainPrefix) {
		let user = getUserFromMention(args[0])
		if(!user.id || !args[0]) user = messageCreate.author
		const cmdRanEmbed = new EmbedBuilder()
		const cmdRanUser = await db.get(`cmdsRan_${user.id}`)
		cmdRanEmbed.setURL(Bot.BotSite)
		cmdRanEmbed.setTitle(`${user.username}'s commands ran!`)
		cmdRanEmbed.setTimestamp()
		cmdRanEmbed.setDescription(`Commands ran!: ${cmdRanUser}`)
		cmdRanEmbed.setColor(Default.DefaultEmbedColor)
		cmdRanEmbed.setFooter({ text: Default.DefaultFooterText })
		messageCreate.channel.send({ embeds: [cmdRanUser] })
		.catch((error) => {
			console.error(error)
			return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
		})
	}
}
