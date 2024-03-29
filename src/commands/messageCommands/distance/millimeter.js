const { getMm } = require("../../../functions/conversion/distance/millimeter")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { conversion } = require("../../../../assets/responseComponents/disclaimers.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "millimeter",
	aliases: [],
	category: "distance",
	utilisation: "millimeter <value>",
	desc: conversion.value,
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.numbers.missing)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.numbers.tooMany)
		let resultForDescription = await getMm(args[0])
		let millimeterResultEmbed = new EmbedBuilder()
		millimeterResultEmbed.setColor(Default.DefaultEmbedColor)
		millimeterResultEmbed.setFooter({ text: Default.DefaultFooterText })
		millimeterResultEmbed.setURL(Bot.BotSite)
		millimeterResultEmbed.setTitle("Converting!")
		millimeterResultEmbed.setDescription(resultForDescription)
		millimeterResultEmbed.setTimestamp()
		return messageCreate.channel.send({ embeds: [millimeterResultEmbed] })
	}
}
