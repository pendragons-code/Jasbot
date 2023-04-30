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
				{ name: "numbersonly", value: "numbersonly" },
				{ name: "all", value: "all" },
				{ help: "help", value: "help" }
			]
		},
		{
			name: "length",
			description: "Number of characters the command is supposed to generate.",
			type: ApplicationCommandOptionType.Integer,
			required: false
		}
	],
	async execute(bot, interactionCreate) {
		let interactionOptions = interactionCreate.options._hoistedOptions
		let stringGenEmbed = new EmbedBuilder()
		if(interactionOptions[0].value === "help") {
			// sends the help part
		}
		if(!interactionOptions[1].value) return interactionCreate.reply("You need to provide a length if you are not using help!")
		switch(interactionOptions[0].value) {
			case "numbersonly":
				break;
		}
	}
}
