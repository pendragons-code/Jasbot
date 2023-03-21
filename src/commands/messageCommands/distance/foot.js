const { getFoot } = require("../../../functions/conversion/distance/foot.js")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { conversion } = require("../../../../assets/responseComponents/disclaimers.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "foot",
	aliases: [],
	category: "distance",
	utilisation: "foot <value>",
	desc: conversion.value,
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.numbers.missing)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.numbers.tooMany)
		let resultForDescription = await getFoot(args[0])
		let footResultEmbed = new EmbedBuilder()
		footResultEmbed.setColor(Default.DefaultEmbedColor)
		footResultEmbed.setFooter({ text: Default.DefaultFooterText })
		footResultEmbed.setURL(Bot.BotSite)
		footResultEmbed.setTitle("Converting!")
		footResultEmbed.setDescription(resultForDescription)
		footResultEmbed.setTimestamp()
		return messageCreate.channel.send({ embeds: [footResultEmbed] })
	}
}
