const { getNm } = require("../../../functions/conversion/distance/nanometer.js")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { conversion } = require("../../../../assets/responseComponents/disclaimers.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "nanometer",
	aliases: [],
	category: "distance",
	utilisation: "nanometer <value>",
	desc: conversion.value,
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.numbers.missing)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.numbers.tooMany)
		let resultForDescription = await getNm(args[0])
		let nanometerResultEmbed = new EmbedBuilder()
		nanometerResultEmbed.setColor(Default.DefaultEmbedColor)
		nanometerResultEmbed.setFooter({ text: Default.DefaultFooterText })
		nanometerResultEmbed.setURL(Bot.BotSite)
		nanometerResultEmbed.setTitle("Converting!")
		nanometerResultEmbed.setDescription(resultForDescription)
		nanometerResultEmbed.setTimestamp()
		return messageCreate.channel.send({ embeds: [nanometerResultEmbed] })
	}
}
