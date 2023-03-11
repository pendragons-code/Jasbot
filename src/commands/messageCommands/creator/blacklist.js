const { db } = require("../../../loaders/bot.js")
const { EmbedBuilder } = require("discord.js")
const { Bot, Default } = require("../../../../config.json")
const { getUserFromMention } = require("../../../functions/mentions/users.js")
module.exports = {
	name: "blacklist",
	aliases: [],
	category: "creator",
	utilisation: "blacklist <@user> <on/off/check>",
	desc: "Blacklists user from discord bot!",
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0] || !args[1]) return messageCreate.channel.send(reject.UserFault.args.missing)
		let user = getUserFromMention(args[0])
		if(!user) return messageCreate.channel.send(reject.UserFault.mentions.invalid)
		if(user.id === Bot.BotOwnerID || user.id === Bot.BotID) return messageCreate.channel.send(reject.UserFault.mentions.SelfMention)
		let BlackListedUser = await db.get(`blacklisted_${user.id}`)
		if(BlackListedUser === null) BlackListedUser = "no"
		let blacklistEmbed = new EmbedBuilder()
		blacklistEmbed.setTimestamp()
		blacklistEmbed.setFooter({ text: Default.DefaultFooterText })
		blacklistEmbed.setColor(Default.DefaultEmbedColor)
		switch(args[1]) {
			case "check":
				blacklistEmbed.setTitle(`${user}'s blacklist status!`)
				blacklistEmbed.setDescription(`Blacklist status: ${BlackListedUser}`)
				messageCreate.channel.send({ embeds: [blacklistEmbed] })
				break
			case "on":
				if(BlackListedUser === "yes") {
					blacklistEmbed.setTitle(`${user} is already blacklisted!`)
					blacklistEmbed.setDescription(`You cannot blacklist users that are already blacklisted!`)
					return messageCreate.channel.send({ embeds: [blacklistEmbed] })
				}
				blacklistEmbed.setTitle(`Blacklisting ${user} from bot!`)
				blacklist.setDescription(`${user} has been blacklisted!`)
				await db.set(`blacklisted_${user.id}`, "yes").catch((error) => {
					console.error(error)
					console.log(messageCreate.content)
					return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
				})
				messageCreate.channel.send({ embeds: [blacklistEmbed] })
				break
			case "off":
				if(BlackListedUser === null) {
					blacklistEmbed.setTitle(`Not blacklisted!`)
					blacklistEmbed.setDescription(`This user is not already on the blacklist!`)
					return messageCreate.channel.send({ embeds: [blacklistEmbed] })
				}
				await db.delete(`blacklisted_${user.id}`).catch((error) => {
					console.error(error)
					console.log(messageCreate.content)
					return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
				})
				messageCreate.channel.send({ embeds: [blacklistEmbed] })
				break
			default:
				return messageCreate.channel.send(reject.UserFault.args.invalid)
		}
	}
}
