const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { conversion } = require("../../../../assets/responseComponents/disclaimers.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { minuteOfArc } = require("../../../functions/conversion/angles/minuteOfArc.js")
module.exports = {
	name: "minuteofarc",
	category: "angles",
	description: conversion.value,
	utilisation:  "minuteofarc <value>",
	options: [
		{
			name: "minuteofarc",
			description: "The amount in minute of arc.",
			type: ApplicationCommandOptionType.String,  // using .String because the user could be trying to throw in a float, not int
			required: true
		}
	],
	async execute(bot, interactionCreate) {
		if(isNaN(interactionCreate.options._hoistedOptions[0].value)) return interactionCreate.reply(reject.UserFault.numbers.invalid)
		let number = parseFloat(interactionCreate.options._hoistedOptions[0].value)
		const embed = new EmbedBuilder()
		embed.setColor(Default.DefaultEmbedColor)
		embed.setFooter({ text: Default.DefaultFooterText })
		embed.setTimestamp()
		embed.setTitle("Conversion!")
		embed.setDescription(minuteOfArc(number))
		embed.setURL(Bot.BotSite)
		return interactionCreate.reply({ embeds: [embed] })
	}
}
