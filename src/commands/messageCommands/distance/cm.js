const { getCm } = require("../../../functions/conversion/distance/cm.js")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { conversion } = require("../../../../assets/responseComponents/disclaimers.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "centimeter",
	aliases: ["cm", "centimeters"],
	category: "distance",
	utilisation: "centimeter <value>",
	desc: conversion.value,
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.numbers.missing)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.numbers.tooMany)
		let resultForDescription = await getCm(args[0])
		let cmResultEmbed = new EmbedBuilder()
		cmResultEmbed.setColor(Default.DefaultEmbedColor)
		cmResultEmbed.setFooter({ text: Default.DefaultFooterText })
		cmResultEmbed.setURL(Bot.BotSite)
		cmResultEmbed.setTitle("Converting!")
		cmResultEmbed.setDescription(resultForDescription)
		cmResultEmbed.setTimestamp()
		return messageCreate.channel.send({ embeds: [cmResultEmbed] })
	}
}
