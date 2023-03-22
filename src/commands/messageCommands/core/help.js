const { EmbedBuilder } = require("discord.js")
const { Default, Decoration } = require("../../../../config.json")
module.exports = {
	name: "help",
	aliases: ["commands"],
	category: "core",
	desc: "Sends list of commands on this bot!",
	utilisation: "help <category/command name>",
	async execute(bot, messageCreate, args, mainPrefix) {
		const primariyTitleWithDecoration = `${Decoration.Title.first} List of commands! ${Decoration.Title.second}`
		const commander = bot.messageCommands.filter(x => x)
		const commanderCategory = bot.messageCommands.map(u => u.category)
		let categoryArray = []
		for(const CategoryName of commanderCategory) {
			if(!categoryArray.includes(CategoryName)) categoryArray.push(CategoryName)
		}
		if(!args[0]) {
			let mainHelpEmbed = new EmbedBuilder()
			mainHelpEmbed.setColor(Default.DefaultEmbedColor)
			mainHelpEmbed.setFooter({ text: Default.DefaultFooterText })
			mainHelpEmbed.setTitle(primariyTitleWithDecoration)
			mainHelpEmbed.setDescription(`Prefix is ${mainPrefix}! This bot has ${commander.size} commands!`)
			mainHelpEmbed.addFields(
				{ name: "Available categories!", value: "`" + mainPrefix + "help <category>`\n\n`" + categoryArray.join("`, `") + "`", inline: true }
			)
			mainHelpEmbed.setTimestamp()
			return messageCreate.channel.send({ embeds: [mainHelpEmbed] })
		}
		if(categoryArray.includes(args[0])) {
			// the naming here is that the category is specified and i want to find the commands of the specified category if you could not pick that up, future me
			let categorySpecificCommands = bot.messageCommands.filter(commands => commands.category === args[0])
			let categorySpecificEmbed = new EmbedBuilder()
			categorySpecificEmbed.setTitle(primariyTitleWithDecoration)
			categorySpecificEmbed.setDescription(`Prefix is ${mainPrefix}! This bot has ${commander.size} commands!`)
			categorySpecificEmbed.addFields(
				{ name: `Available commands!`, value: "`" + categorySpecificCommands.map(cmd => cmd.name).join("`, `") + "`", inline: true }
			)
			categorySpecificEmbed.setColor(Default.DefaultEmbedColor)
			categorySpecificEmbed.setFooter({ text: Default.DefaultFooterText })
			categorySpecificEmbed.setTimestamp()
			return messageCreate.channel.send({ embeds: [categorySpecificEmbed] })
		}
		if(args[0] && !categoryArray.includes(args[0])) {
			const searchCommand = bot.messageCommands.get(args.join(" ").toLowerCase()) || bot.messageCommands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()))
			if(!searchCommand) return messageCreate.channel.send(`I did not find this command!`)
			let searchCommandEmbed = new EmbedBuilder()
			searchCommandEmbed.setTitle("Help Center!")
			searchCommandEmbed.setColor(Default.DefaultEmbedColor)
			searchCommandEmbed.setFooter({ text: Default.DefaultFooterText })
			searchCommandEmbed.addFields(
				{ name: "Name", value: searchCommand.name, inline: true },
				{ name: "Category", value: searchCommand.category, inline: true },
				{ name: "Alias(es)", value: searchCommand.aliases.length < 1 ? "None" : searchCommand.aliases.join(", "), inline: true },
				{ name: "Utilisation", value: searchCommand.utilisation, inline: true },
				{ name: "Description", value: searchCommand.desc }
			)
			searchCommandEmbed.setTimestamp()
			searchCommandEmbed.setDescription("Have fun using this bot!")

			return messageCreate.channel.send({ embeds: [searchCommandEmbed] })
		}
	}
}
