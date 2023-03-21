const { getMile } = require("../../../functions/conversion/distance/mile.js")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { conversion } = require("../../../../assets/responseComponents/disclaimers.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "mile",
	aliases: [],
	category: "distance",
	utilisation: "mile <value>",
	desc: conversion.value,
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.numbers.missing)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.numbers.tooMany)
		let resultForDescription = await getMile(args[0])
		let mileResultEmbed = new EmbedBuilder()
		mileResultEmbed.setColor(Default.DefaultEmbedColor)
		mileResultEmbed.setFooter({ text: Default.DefaultFooterText })
		mileResultEmbed.setURL(Bot.BotSite)
		mileResultEmbed.setTitle("Converting!")
		mileResultEmbed.setDescription(resultForDescription)
		mileResultEmbed.setTimestamp()
		return messageCreate.channel.send({ embeds: [mileResultEmbed] })
	}
}
