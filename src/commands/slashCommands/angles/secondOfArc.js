const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { conversion } = require("../../../../assets/responseComponents/disclaimers.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { secondOfArc } = require("../../../functions/conversion/angles/secondOfArc.js")
module.exports = {
	name: "secondofarc",
	category: "angles",
	description: conversion.value,
	utilisation:  "secondofarc <value>",
	options: [
		{
			name: "secondofarc",
			description: "The amount in secondofarc.",
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
		embed.setDescription(secondOfArc(number))
		embed.setURL(Bot.BotSite)
		return interactionCreate.reply({ embeds: [embed] })
	}
}
