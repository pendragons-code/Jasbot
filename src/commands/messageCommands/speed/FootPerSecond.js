const { getFootPerSecond } = require("../../../functions/conversion/speed/FootPerSecond.js")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { conversion } = require("../../../../assets/responseComponents/disclaimers.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "footpersecond",
	aliases: ["fps"],
	category: "speed",
	utilisation: "footpersecond<value>",
	desc: conversion.value,
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.numbers.missing)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.numbers.tooMany)
		let resultForDescription = await getFootPerSecond(args[0])
		let ResultEmbed = new EmbedBuilder()
		ResultEmbed.setColor(Default.DefaultEmbedColor)
		ResultEmbed.setFooter({ text: Default.DefaultFooterText })
		ResultEmbed.setURL(Bot.BotSite)
		ResultEmbed.setTitle("Converting!")
		ResultEmbed.setDescription(resultForDescription)
		ResultEmbed.setTimestamp()
		return messageCreate.channel.send({ embeds: [ResultEmbed] })
	}
}
