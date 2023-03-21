const { getInch } = require("../../../functions/conversion/distance/inch.js")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { conversion } = require("../../../../assets/responseComponents/disclaimers.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "inch",
	aliases: [],
	category: "distance",
	utilisation: "inch <value>",
	desc: conversion.value,
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.numbers.missing)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.numbers.tooMany)
		let resultForDescription = await getFoot(args[0])
		let inchResultEmbed = new EmbedBuilder()
		inchResultEmbed.setColor(Default.DefaultEmbedColor)
		inchResultEmbed.setFooter({ text: Default.DefaultFooterText })
		inchResultEmbed.setURL(Bot.BotSite)
		inchResultEmbed.setTitle("Converting!")
		inchResultEmbed.setDescription(resultForDescription)
		inchResultEmbed.setTimestamp()
		return messageCreate.channel.send({ embeds: [inchResultEmbed] })
	}
}
