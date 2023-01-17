const covidAPI = require("novelcovid")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
module.exports = {
	name: "country",
	aliases: [],
	category: "utility",
	utilisation: "country <country name>",
	desc: "Shows covid details for a specific country. Based on the novelcovid package (npm)!",
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args) return messageCreate.channel.send(reject.UserFault.args.missing)
		let countryData = await covidAPI.countries({ country: args.join(" ") })
		if(!countryData) return messageCreate.channel.send(reject.WeAreScrewed.BadApiResponse)
		if(countryData.message) return messageCreate.channel.send(reject.UserFault.args.invalid)
		const countryEmbed = new EmbedBuilder()
		countryEmbed.setColor(Default.DefaultEmbedColor)
		countryEmbed.setURL(Bot.BotSite)
		countryEmbed.setFooter({ text: Default.DefaultFooterText })
		countryEmbed.setTitle(`${args.join(" ")} cases!`)
		messageCreate.channel.send({ embeds: [countryEmbed] })
		.catch((error) => {
			console.error(error)
			console.log(messageCreate.content)
			return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
		})
	}
}
