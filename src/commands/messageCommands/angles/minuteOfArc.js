const { minuteOfArc } = require("../../../functions/conversion/angles/minuteOfArc.js")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { conversion } = require("../../../../assets/responseComponents/disclaimers.json")
module.exports = {
	name: "minofarc",
	aliases: [],
	category: "angles",
	desc: conversion.value,
	utilisation: "minofarc <value>",
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.numbers.missing)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.numbers.tooMany)
		const resultEmbed = new EmbedBuilder()
		let number = parseFloat(args[0])
		resultEmbed.setURL(Bot.BotSite)
		resultEmbed.setFooter({ text: Default.DefaultFooterText })
		resultEmbed.setColor(Default.DefaultEmbedColor)
		resultEmbed.setTitle("Converting!")
		resultEmbed.setTimestamp()
		resultEmbed.setDescription(minuteOfArc(number))
		return messageCreate.channel.send({ embeds: [resultEmbed] })
	}
}
