const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { stringGen } = require("../../../functions/randomGeneration/stringGen.js")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "stringgen",
	category: "utility",
	description: "Generates random string with options!",
	utilisation: "stringgen <alphanumericals/alphabets/numbersonly/all> <character length>\n stringgen <help>",
	options: [
		{
			name: "type",
			description: "<alphanumericals/alphabets/numbersonly/all/help>",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{ name: "alphanumericals", value: "alphanumericals" },
				{ name: "alphabets", value: "alphabets" },
				{ name: "numbersonly", value: "numbersonly" }
			]
		}
	],
	async execute(bot, interactionCreate) {
	}
}
