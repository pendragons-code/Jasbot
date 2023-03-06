const { Default, Bot } = require("../../../../config.json")
const { getUserFromMention } = require("../../../functions/mentions/users.js")
const { EmbedBuilder, PermissionsBitField } = require("discord.js")
const { giveCurrentDate } = require("../../../functions/dateAndTime/giveCurrentDate.js")
const { db } = require("../../../loaders/bot.js")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "kick",
	aliases: [],
	category: "moderation",
	desc: "Kicks the user out of the server!",
	utilisation: "kick <@user || user id> <reason>",
	minperms: [ PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers ],
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.args.missing)
		let targetToKick = getUserFromMention(args[0]) || messageCreate.guild.members.cache.get(args[0])
		if(!targetToKick) return messageCreate.channel.send(reject.UserFault.mentions.missing)
		let reasonProvided = args.slice(1).join(" ") // The arguments are an array, remember to join everything together!
		if(!args[1]) reasonProvided = "None provided!"
		if(targetToKick.id === messageCreate.author.id) return messageCreate.channel.send(reject.UserFault.mentions.SelfMention)
		if(targetToKick.id === bot.user.id) return messageCreate.channel.send(reject.UserFault.mentions.BotMention)
		if(messageCreate.member.roles.highest.comparePositionTo(targetToKick.roles.highest) < 1) return messageCreate.channel.send(reject.UserFault.privilege.BotTooLow)
		await targetToKick.kick({
			reason: reasonProvided
		}).catch((error) => {
			console.error(error)
			console.log(messageCreate.content)
			return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
		})
		await db.add(`offenseCount_${messageCreate.guild.id}_${targetToKick.id}`, 1)
		let offenseCount = await db.get(`offenseCount_${messageCreate.guild.id}_${targetToKick.id}`)
		let timeManager = await giveCurrentDate()
		let timeOfKick = `${timeManager.date}-${timeManager.month}-${timeManager.year}---${timeManager.hours}-${timeManager.minutes}-${timeManager.seconds}`
		await db.set(`kick_${messageCreate.guild.id}_${targetToKick.id}_${offenseCount}`, { moderator: messageCreate.author.id, reason: reasonProvided, time: timeOfKick }).catch((error) => {
			console.error(error)
			console.log(messageCreate.content)
			return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
		})
		let kickCompleteEmbed = new EmbedBuilder()
		kickCompleteEmbed.setColor(Default.DefaultEmbedColor)
		kickCompleteEmbed.setFooter({ text: DefaultFooterText })
		kickCompleteEmbed.setDescription(`${targetToKick} has been kicked from this server!`)
		kickCompleteEmbed.setURL(Bot.BotSite)
		kickCompleteEmbed.setTimestamp()
		kickCompleteEmbed.setTitle("Kicking.")
		return messageCreate.channel.send({ embeds: [kickCompleteEmbed] })
	}
}
