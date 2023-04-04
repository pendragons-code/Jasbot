const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { conversion } = require("../../../../assets/responseComponents/disclaimers.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { milliRadian } = require("../../../functions/conversion/angles/milliradian.js")
module.exports = {
	name: "milliradians",
	category: "angles",
	description: conversion.value,
	utilisation:  "milliradian <value>",
	options: [
		{
			name: "milliradians",
			description: "The amount in milliradians.",
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
		embed.setDescription(milliRadian(number))
		embed.setURL(Bot.BotSite)
		return interactionCreate.reply({ embeds: [embed] })
	}
}
