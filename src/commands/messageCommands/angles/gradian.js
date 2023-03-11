const { gradian } = require("../../../functions/conversion/angles/gradian.js")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { conversion } = require("../../../../assets/responseComponents/disclaimers.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "gradian",
	aliases: ["gradians"],
	category: "angles",
	desc: conversion.value,
	utilisation: "gradian <value>",
	async execute(bot, messageCreate, args, mainPrefix) {
		//Before I go on, I want to emphasize that I will not use the api that i already built, especially since redundancy is important.
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.args.missing)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.args.tooMany)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.UserFault.invalid)
		let number = parseFloat(args[0])
		const embed = new EmbedBuilder()
		embed.setColor(Default.DefaultEmbedColor)
		embed.setFooter({ text: Default.DefaultFooterText })
		embed.setTimestamp()
		embed.setTitle("Conversion!")
		embed.setDescription(gradian(number))
		embed.setURL(Bot.BotSite)
		return messageCreate.channel.send({ embeds: [embed] })
	}
}
