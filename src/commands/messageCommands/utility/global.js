const covidAPI = require("novelcovid")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
module.exports = {
	name: "global",
	aliases: [],
	category: "utility",
	utilisation: "global",
	desc: "Shows global statistics for covid, based on the novelcovid api (npm).",
	async execute(bot, messageCreate, args, mainPrefix) {
		const data = await covidAPI.all()
		const globalCovidApi = new EmbedBuilder()
		globalCovidApi.setColor(Default.DefaultEmbedColor)
		globalCovidApi.setFooter({ text: Default.DefaultFooterText })
		globalCovidApi.setTimestamp()
		globalCovidApi.setURL(Bot.BotSite)
		globalCovidApi.setTitle("Global statistics!")
		globalCovidApi.setDescription("Information here are based on novelcovid's api!")
		//stats in embed
		
		globalCovidApi.addFields({ name: "Cases", value: data.cases })
		globalCovidApi.addFields({ name: "Active", value: data.active })
		globalCovidApi.addFields({ name: "Critical Cases", value: data.critical })
		globalCovidApi.addFields({ name: "Deaths", value: data.deaths })
		globalCovidApi.addFields({ name: "Recovered", value: data.recovered })

		messageCreate.channel.send({ embeds: [globalCovidApi] })
		.catch((error) => {
			console.error(error)
			return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
		})
	}
}
