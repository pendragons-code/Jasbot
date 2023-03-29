const reject = require("../../../../assets/responseComponents/rejection.json")
const { EmbedBuilder } = require("disocrd.js")
const { cpuUsage } = require("os-utils")
const { ProjectUsage } = require("../../../functions/usage/usage.js")
const { Default, Bot } = require("../../../../config.json")
module.exports = {
	name: "usage",
	category: "core",
	utilisation: "usage",
	desc: "Sends you details of the bot usage so far.",
	async execute(bot, interactionCreate) {
		cpuUsage(
			async function(ToEmbedCpuUsage) {
				const usageEmbed = new EmbedBuilder()
				usageEmbed.setColor(Default.DefaultEmbedColor)
				usageEmbed.setDescription(ProjectUsage(ToEmbedCpuUsage))
				usageEmbed.setTitle("Jasbot's Usage!")
				usageEmbed.setURL(Bot.BotSite)
				usageEmbed.setTimestamp()
				usageEmbed.setFooter({ text: Default.DefaultFooterText })
				interactionCreate.reply({ embeds: [usageEmbed] })
				.catch((error) => {
					console.error(error)
					return interactionCreate.reply(reject.WeAreScrewed.ExecutionError)
				})
			}
		)
	}
}
