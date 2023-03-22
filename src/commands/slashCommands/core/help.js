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
	async execute({bot, interactionCreate}) {
		const primariyTitleWithDecoration = `${Decoration.Title.first} List of commands! ${Decoration.Title.second}`
		const slashCommander = bot.slashCommands.filter(x => x)
		const noArgumentHelpEmbed = new EmbedBuilder()
		const categoryArray = []
		if(!inter.options._hoistedOptions[0].value){
			noArgumentHelpEmbed.setTitle(primariyTitleWithDecoration)
			noArgumentHelpEmbed.setColor(Default.DefaultEmbedColor)
			noArgumentHelpEmbed.setFooter({ text: Default.DefaultFooterText })
			noArgumentHelpEmbed.setTimestamp()
			noArgumentHelpEmbed.setURL(Bot.BotSite)
			noArgumentHelpEmbed.setDescription(`This bot has ${slashCommander.size} slash commands!`)
			noArgumentHelpEmbed.addFields(
				{ name: "Available categories!", value: "`help <category>`\n\n`" + categoryArray.join("`, `")+ "`", inline: true }
			)
			return interactionCreate.reply()
		}
	}
}
