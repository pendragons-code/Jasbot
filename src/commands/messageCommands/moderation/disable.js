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
	minPerms: [PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers],
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[1]) return messageCreate.channel.send(reject.UserFault.args.missing)
		if(args[0] != "category" && args[0]!= "command") return messageCreate.channel.send(reject.UserFault.args.invalid)
		if(args[2]) return messageCreate.channel.send(reject.UserFault.args.tooMany)
		if(args[0] === "category") {
			let availableCategories = bot.commands.map(command => command.category)
			let allPossibleCategoriesInAnArray = []
			availableCategories.forEach((categoryInQuestion) => {
				if(!allPossibleCategoriesInAnArray.includes(categoryInQuestion)) allPossibleCategoriesInAnArray.push(categoryInQuestion) // I ran out of name ideas
			})
			if(!allPossibleCategoriesInAnArray.includes(args[1]) || args[1] === "moderation") return messageCreate.channel.send(reject.UserFault.args.invalid)
			const disabledCategory = await db.get(`disabledCategory_${messageCreate.guild.id}_${args[1]}`)
			if(disabledCategory === "disabled") return messageCreate.channel.send("This category is already disabled!")
			let categoryEmbed = new EmbedBuilder()
			categoryEmbed.setColor(Default.DefaultEmbedColor)
			categoryEmbed.setFooter({ text: Default.DefaultEmbedColor })
			categoryEmbed.setDescription(`Category ${args[1]} has been disabled!`)
			categoryEmbed.setTitle(`Disabling Category!`)
			categoryEmbed.setTimestamp()
			await db.set(`disabledCategory_${messageCreate.guild.id}_${args[1]}`, "disabled")
			.catch((error) => {
				console.error(error)
				console.log(messageCreate)
				console.log(messageCreate.content)
				return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
			})
			.then(() => {
				return messageCreate.channel.send({ embeds: [categoryEmbed] })
			})
		}
		if(args[0] === "command") {
			let cmd = bot.commands.get(args[1] || bot.commands.find(cmd => cmd.aliases) && cmd.aliases.includes(args[1]))
			if(!cmd.name) return messageCreate.channel.send(reject.UserFault.args.invalid)
			if(cmd.name === "enable") return messageCreate.channel.send("You cannot disable the command; enable.")
			let commandEmbed = new EmbedBuilder()
			commandEmbed.setColor(Default.DefaultEmbedColor)
			commandEmbed.setTitle("Disabling Command!")
			commandEmbed.setFooter({ text: Default.DefaultFooterText })
			commandEmbed.setDescription(`Command ${args[1]} has been disabled!`)
			commandEmbed.setTimestamp()
			await db.set(`disableCommand_${messageCreate.guild.id}_${cmd.name}`, "disabled")
			// you may be asking, why use cmd.name?
			// If i didn't I know have to account for every single alias and this could potentioally mean more storage occupied.
			.catch((error) => {
				console.error(error)
				console.log(messageCreate)
				console.log(messageCreate.content)
				return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
			})
			.then(() => {
				return messageCreate.channel.send({ embeds: [commandEmbed] })
			})
		}
	}
}
