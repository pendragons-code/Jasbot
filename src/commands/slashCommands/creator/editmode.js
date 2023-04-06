const { db } = require("quick.db")
const { ApplicationCommandOptionType } = require("discord.js")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "editmode",
	utilisation: "editmode <on/off/check>",
	category: "creator",
	description: "Sets the bot into editmode, a state only usable by the creator!",
	options: [
		{
			name: "state",
			description: "",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{ name: "off", value: "off" },
				{ name: "on", value: "on" },
				{ name: "check", value: "check" }
			]
		}
	],
	async execute(bot, interactionCreate) {
		let state = interactionCreate.options._hoistedOptions[0].value
	}
}
