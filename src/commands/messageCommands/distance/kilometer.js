const { getKm } = require("../../../functions/conversion/distance/foot.js")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { conversion } = require("../../../../assets/responseComponents/disclaimers.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "kilometer",
	aliases: ["km"],
	category: "distance",
	utilisation: "kilometer <value>",
	desc: conversion.value,
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.numbers.missing)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.numbers.tooMany)
		let resultForDescription = await getKm(args[0])
		let kmResultEmbed = new EmbedBuilder()
		kmResultEmbed.setColor(Default.DefaultEmbedColor)
		kmResultEmbed.setFooter({ text: Default.DefaultFooterText })
		kmResultEmbed.setURL(Bot.BotSite)
		kmResultEmbed.setTitle("Converting!")
		kmResultEmbed.setDescription(resultForDescription)
		kmResultEmbed.setTimestamp()
		return messageCreate.channel.send({ embeds: [kmResultEmbed] })
	}
}
