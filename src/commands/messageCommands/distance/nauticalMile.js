const { getNauticalMile } = require("../../../functions/conversion/distance/nauticalMile.js")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { conversion } = require("../../../../assets/responseComponents/disclaimers.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "nauticalmile",
	aliases: [],
	category: "distance",
	utilisation: "nautical mile <value>",
	desc: conversion.value,
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.numbers.missing)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.numbers.tooMany)
		let resultForDescription = await getNauticalMile(args[0])
		let nauticalMileResultEmbed = new EmbedBuilder()
		nauticalMileResultEmbed.setColor(Default.DefaultEmbedColor)
		nauticalMileResultEmbed.setFooter({ text: Default.DefaultFooterText })
		nauticalMileResultEmbed.setURL(Bot.BotSite)
		nauticalMileResultEmbed.setTitle("Converting!")
		nauticalMileResultEmbed.setDescription(resultForDescription)
		nauticalMileResultEmbed.setTimestamp()
		return messageCreate.channel.send({ embeds: [nauticalMileResultEmbed] })
	}
}
