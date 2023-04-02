const { EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js")
const { Bot, Default } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { db } = require("../../../loaders/bot.js")
module.exports = {
	name: "prefix",
	category: "core",
	description: "A basic help command!",
	utilisation: "help <category/command name>",
	minperms: [PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers],
	options: [
		{
			name: "prefix",
			description: "The term used to be set as the prefix.",
			type: ApplicationCommandOptionType.String,
			required: true
		}
	],
	async execute(bot, interactionCreate) {
		let prefixEmbed = new EmbedBuilder()
		prefixEmbed.setColor(Default.DefaultEmbedColor)
		prefixEmbed.setURL(Bot.BotSite)
		prefixEmbed.setFooter({ text: Default.DefaultFooterText })
		prefixEmbed.setTimestamp()
		if(Default.DefaultBannedWords.includes(interactionCreate.options._hoistedOptions[0].value)){
			prefixEmbed.setTitle("Failed")
			prefixEmbed.setDescription("The creators of this bot does not condone the usage of this word and will have the right to refuse service should you decide to set such profanity as the prefix!")
			return interactionCreate.reply({ embeds: [prefixEmbed] })
		}
		if(interactionCreate.options._hoistedOptions[0].value.trim().includes(" ")) return interactionCreate.reply("Your argument still had whitespaces after trimming. Remove all spaces to change your prefix.")

		await db.set(`prefix_${interactionCreate.guildId}`, interactionCreate.options._hoistedOptions[0].value.trim())
		.catch((error) => {
			console.error(error)
			return interactionCreate.reply(reject.WeAreScrewed.ExecutionError)
		})
		return interactionCreate.reply(`Prefix has been changed to ${interactionCreate.options._hoistedOptions[0].value.trim()}!`)
	}
}
