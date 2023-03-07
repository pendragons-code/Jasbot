const reject = require("../../../../assets/responseComponents/rejection.json")
const weather = require("weather-js")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
module.exports = {
	name: "weather",
	aliases: [],
	category: "utility",
	utilisation: "weather <destination>",
	desc: "Provides weather details using weather-js!",
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args) return messageCreate.channel.send(`${reject.UserFault.args.missing}`)
		weather.find({ search: args.join(" "), degreeTpe: "C" }, function (err, results) {
			const weatherEmbed = new EmbedBuilder()
			let fahrenheitTemp = (results[0].current.temperature * 9/5) + 32
			weatherEmbed.setColor(Default.DefaultEmbedColor)
			weatherEmbed.setURL(Bot.BotSite)
			weatherEmbed.setFooter({ text: Default.DefaultFooterText })
			weatherEmbed.setThumbnail(results[0].current.imageUrl)
			weatherEmbed.setDescription("Details may not be 100% accurate.")

			weatherEmbed.addFields({ name: "Temperature", value: `${results[0].current.temperature} Degrees Celsius` })
			weatherEmbed.addFields({ name: "Temperature", value: `${fahrenheitTemp} Degrees Fahrenheit` })
			weatherEmbed.addFields({ name: "Sky Text", value: results[0].current.skytext })
			weatherEmbed.addFields({ name: "Humidity", value: results[0].current.humidity })
			weatherEmbed.addFields({ name: "Wind Speed", value: results[0].current.windspeed })
			weatherEmbed.addFields({ name: "Observation Time", value: results[0].current.observationtime })
			weatherEmbed.addFields({ name: "Wind Display", value: results[0].current.winddisplay })

			messageCreate.channel.send({ embeds: [weatherEmbed] })
			.catch((error) => {
				console.log(messageCreate.content)
				console.error(error)
				return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
			})
		})
	}
}
