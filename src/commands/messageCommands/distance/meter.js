const { getMeter } = require("../../../functions/conversion/distance/meter.js")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { conversion } = require("../../../../assets/responseComponents/disclaimers.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "meter",
	aliases: [],
	category: "distance",
	utilisation: "meter <value>",
	desc: conversion.value,
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.numbers.missing)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.numbers.tooMany)
		let resultForDescription = await getMeter(args[0])
		let meterResultEmbed = new EmbedBuilder()
		meterResultEmbed.setColor(Default.DefaultEmbedColor)
		meterResultEmbed.setFooter({ text: Default.DefaultFooterText })
		meterResultEmbed.setURL(Bot.BotSite)
		meterResultEmbed.setTitle("Converting!")
		meterResultEmbed.setDescription(resultForDescription)
		meterResultEmbed.setTimestamp()
		return messageCreate.channel.send({ embeds: [meterResultEmbed] })
	}
}
