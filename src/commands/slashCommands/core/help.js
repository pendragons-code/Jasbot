const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
const { Bot, Default, Decoration } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "help",
	aliases: ["commands"],
	category: "core",
	description: "A basic help command!",
	utilisation: "help <category/command name>",
	options: [
		{
			name: "category",
			description: "The search term to have the commands to be sorted by.",
			type: ApplicationCommandOptionType.String,
			required: false
		},
		{
			name: "command",
			description: "The search term to have the command send the details for.",
			type: ApplicationCommandOptionType.String,
			required: false
		}
	],
	async execute(bot, interactionCreate) {
		if(interactionCreate.options._hoistedOptions[1]) return interactionCreate.reply(reject.UserFault.args.tooMany)
		const primariyTitleWithDecoration = `${Decoration.Title.first} List of commands! ${Decoration.Title.second}`
		const slashCommander = bot.slashCommands.filter(x => x)
		const HelpEmbed = new EmbedBuilder()
		HelpEmbed.setTitle(primariyTitleWithDecoration)
		HelpEmbed.setColor(Default.DefaultEmbedColor)
		HelpEmbed.setFooter({ text: Default.DefaultFooterText })
		HelpEmbed.setTimestamp()
		HelpEmbed.setURL(Bot.BotSite)
		HelpEmbed.setDescription(`This bot has ${slashCommander.size} slash commands!`)
		const categoryArray = []
		const slashCommanderCategory = bot.slashCommands.map(u => u.category)
		for(const CategoryName of slashCommanderCategory) {
			if(!categoryArray.includes(CategoryName)) categoryArray.push(CategoryName)
		}
		console.log(categoryArray)
		if(!interactionCreate.options._hoistedOptions[0]){
			HelpEmbed.addFields(
				{ name: "Available categories!", value: "`help <category>`\n\n`" + categoryArray.join("`, `")+ "`", inline: true }
			)
			return interactionCreate.reply({ embeds: [HelpEmbed] })
		}
		let actionWord = interactionCreate.options._hoistedOptions[0].value
		if(categoryArray.includes(actionWord)){
			let categorySpecificSlashCommands = bot.slashCommands.filter(command => command.category === actionWord)
			HelpEmbed.addFields(
				{ name: "Available commands!", value: "`" + categorySpecificSlashCommands.map(cmd => cmd.name).join("`, `") + "`", inline: true }
			)
			return interactionCreate.reply({ embeds: [HelpEmbed] })
		}
		//command specific help fetch
	}
}
