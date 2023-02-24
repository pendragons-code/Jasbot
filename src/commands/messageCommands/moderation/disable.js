const { db } = require("../../../loaders/bot.js")
const { EmbedBuilder, PermissionsBitField } = require("discord.js")
const { Default } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "disable",
	aliases: [],
	category: "moderation",
	utilisation: "disable <category/command> <category name/command name>",
	desc: "Disables commands, needs at least kick or bad memebers permissions for this to work!",
	minperms: [PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers],
	async execute(bot, messageCreate, args, prefix) {
		if(!args[1]) return messageCreate.channel.send(reject.UserFault.args.missing)
		if(args[0] != "category" && args[0]!= "command") return messageCreate.channel.send(reject.UserFault.args.invalid)
		if(args[2]) return messageCreate.channel.send(reject.UserFault.args.tooMany)
		const availableCategories = bot.commands.map(command => command.category)
		let allPossibleCategoriesInAnArray = []
		availableCategories.forEach((categoryInQuestion) => {
			if(!allPossibleCategoriesInAnArray.includes(categoryInQuestion)) allPossibleCategoriesInAnArray.push(categoryInQuestion) // I ran out of name ideas
		})
		if(args[0] === "category"){
			if(!allPossibleCategoriesInAnArray.includes(args[1])) return messageCreate.channel.send(reject.UserFault.args.invalid)
			let categoryEmbed = new EmbedBuilder()
		}
	}
}
