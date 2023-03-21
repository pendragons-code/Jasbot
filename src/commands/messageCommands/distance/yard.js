const { getYard } = require("../../../functions/conversion/distance/yard.js")
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
		let resultForDescription = await getYard(args[0])
		let yardResultEmbed = new EmbedBuilder()
		yardResultEmbed.setColor(Default.DefaultEmbedColor)
		yardResultEmbed.setFooter({ text: Default.DefaultFooterText })
		yardResultEmbed.setURL(Bot.BotSite)
		yardResultEmbed.setTitle("Converting!")
		yardResultEmbed.setDescription(resultForDescription)
		yardResultEmbed.setTimestamp()
		return messageCreate.channel.send({ embeds: [yardResultEmbed] })
	}
}
