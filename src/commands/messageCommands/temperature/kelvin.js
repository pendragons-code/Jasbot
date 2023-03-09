const { convertKelvin } = require("../../../functions/conversion/temperature/fahrenheit.js")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { conversion } = require("../../../../assets/responseComponents/disclaimers.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "kelvin",
	aliases: [],
	category: "temperature",
	desc: conversion.value,
	utilisation: "temperature <value>",
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.numbers.missing)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.numbers.tooMany)
		let convertedEmbed = new EmbedBuilder()
		convertedEmbed.setTitle("Converting!")
		convertedEmbed.setFooter({ text: Default.DefaultFooterText })
		convertedEmbed.setColor(Default.DefaultFooterText)
		convertedEmbed.setTimestamp()
		convertedEmbed.setDescription(await convertKelvin(args[0]))
		convertedEmbed.setURL(Bot.BotSite)
		return messageCreate.channel.send({ embeds: [convertedEmbed] })
	}
}
