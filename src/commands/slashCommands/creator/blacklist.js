const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
const { Bot, Default } = require("../../../../config.json")
const { db } = require("../../../loaders/bot.js")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { getUserFromMention } = require("../../../functions/mentions/users.js")
module.exports = {
	name: "blacklist",
	category: "creator",
	description: "A basic blacklist command!",
	utilisation: "blacklist <user> <on/off>",
	options: [
		{
			name: "user",
			description: "Mention the user to blacklist!",
			type: ApplicationCommandOptionType.String,
			required: true
		},
		{
			name: "state",
			description: "The state the command should run in: <on/off/check>!",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{ name: "off", value: "off" },
				{ name: "on", value: "on" },
				{ name: "check", value: "check" }
			]
		}
	],
	//data: new SlashCommandBuilder() I am aware of this method, I will change it soon i think. I am going to have to stick to this method first, the new command handler will require a lot of changes for this to work
	async execute(bot, interactionCreate) {
		let user = getUserFromMention(interactionCreate.options._hoistedOptions[0].value)
		if(!user) return interactionCreate.reply(reject.UserFault.mentions.invalid)
		if(user.id === Bot.BotID || user.id === Bot.BotOwnerID) return interactionCreate.reply(reject.UserFault.mentions.SelfMention)
		let state = interactionCreate.options._hoistedOptions[1].value
		const blacklistStatus = await db.get(`blacklisted_${user.id}`)
		if(blacklistStatus === null) blacklistStatus = "no"
		let blacklistEmbed = new EmbedBuilder()
		blacklistEmbed.setTimestamp()
		blacklistEmbed.setURL(Bot.BotSite)
		blacklistEmbed.setFooter({ text: Default.DefaultFooterText })
		blacklistEmbed.setColor(Default.DefaultEmbedColor)
		switch(state) {
			case "check":
				blacklistEmbed.setTitle(`${user}'s blacklist status!`)
				blacklistEmbed.setDescription(`Blacklist status: ${blacklistStatus}`)
				interactionCreate.reply({ embeds: [blacklistEmbed] })
				break;
			case "off":
				if(blacklistStatus === "no") return interactionCreate.reply("This user was not blacklisted!")
				await db.delete(`blacklisted_${user.id}`).catch((error) => { // db operations are costly, especially if this bot gets big
					console.log(interactionCreate)
					console.error(error)
					return interactionCreate.reply(reject.WeAreScrewed.ExecutionError)
				})
				blacklistEmbed.setDescription(`${user} has been removed from blacklist!`)
				blacklistEmbed.setTitle(`Whitelisting ${user}!`)
				interactionCreate.reply({ embeds: [blacklistEmbed] })
				break;
			case "on":
				if(blacklistEmbed === "yes") return interactionCreate.reply("This user is already blacklisted!")
				await db.set(`blacklisted_${user.id}`, "yes").catch((error) => {
					console.error(error)
					console.log(messageCreate.content)
					return interactionCreate.reply(reject.WeAreScrewed.ExecutionError)
				})
				blacklistEmbed.setTitle(`Blacklisting ${user}!`)
				blacklistEmbed.setDescription(`${user} has been blacklisted`)
				interactionCreate.reply({ embeds: [blacklistEmbed] })
				break;
			default:
				//honestly not even possible
				console.error("HOW THE FUC*!??!!?")
				console.log(interactionCreate)
				return interactionCreate.reply(reject.WeAreScrewed.ExecutionError)
		}
	}
}
