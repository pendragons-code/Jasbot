const { getMicrometer } = require("../../../functions/conversion/distance/micrometer.js")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { conversion } = require("../../../../assets/responseComponents/disclaimers.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "micrometer",
	aliases: [],
	category: "distance",
	utilisation: "micrometer <value>",
	desc: conversion.value,
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.numbers.missing)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.numbers.tooMany)
		let resultForDescription = await getMicrometer(args[0])
		let micrometerResultEmbed = new EmbedBuilder()
		micrometerResultEmbed.setColor(Default.DefaultEmbedColor)
		micrometerResultEmbed.setFooter({ text: Default.DefaultFooterText })
		micrometerResultEmbed.setURL(Bot.BotSite)
		micrometerResultEmbed.setTitle("Converting!")
		micrometerResultEmbed.setDescription(resultForDescription)
		micrometerResultEmbed.setTimestamp()
		return messageCreate.channel.send({ embeds: [micrometerResultEmbed] })
	}
}
