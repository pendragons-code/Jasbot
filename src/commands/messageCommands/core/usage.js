const reject = require("../../../../assets/responseComponents/rejection.json")
const { EmbedBuilder } = require("discord.js")
const { cpuUsage } = require("os-utils")
const { ProjectUsage } = require("../../../functions/usage/usage.js")
const { Default, Bot } = require("../../../../config.json")
module.exports = {
	name: "usage",
	aliases: ["-u"],
	category: "core",
	utilisation: "usage",
	desc: "Sends you details of the bot usage so far.",
	async execute(bot, messageCreate, args, mainPrefix) {
		cpuUsage( async function(ToEmbedCpuUsage) {
			const usageEmbed = new EmbedBuilder()
			usageEmbed.setColor(Default.DefaultEmbedColor)
			usageEmbed.setDescription(ProjectUsage(ToEmbedCpuUsage))
			usageEmbed.setTitle("Jasbot's Usage!")
			usageEmbed.setURL(Bot.BotSite)
			usageEmbed.setTimestamp()
			usageEmbed.setFooter({ text: Default.DefaultFooterText })
			messageCreate.channel.send({ embeds: [usageEmbed] })
			.catch((error) => {
				console.error(error)
				return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
			})
		})
	}
}
