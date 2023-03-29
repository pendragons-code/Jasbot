const { db } = require("../../../loaders/bot.js")
const { PermissionsBitField } = require("discord.js")
const { Default } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "prefix",
	aliases: [],
	category: "core",
	desc: "Changes bot prefix!",
	utilisation: "prefix <new prefix>",
	minperms: [PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers],
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.args.missing)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.args.tooMany)
		if(Default.DefaultBannedWords.includes(args[0])) return messageCreate.channel.send("The creators of this bot does not condone the usage of this word and will have the right to refuse service should you decide to set such profanity as the prefix!")
		await db.set(`prefix_${messageCreate.guild.id}`, args[0])
		.catch((error) => {
			console.error(error)
			return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
		})
		messageCreate.channel.send(`Prefix has been changed to ${args[0]}!`)
	}
}
