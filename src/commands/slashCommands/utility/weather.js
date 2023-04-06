const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { find } = require("weather-js")
const { Default, Bot } = require("../../../../config.json")
module.exports = {
	name: "weather",
	utilisation: "weather <destination>",
	category: "utility",
	description: "Provides weather details using weather-js",
	options: [
		{
			name: "destination",
			description: "A destination.",
			type: ApplicationCommandOptionType.String,
			required: true
		}
	],
	async execute(bot, interactionCreate) {
		find({ search: interactionCreate.options._hoistedOptions[0].value, degreeType: "C" }, function (err, results) {
			if(err) return interactionCreate.reply(reject.WeAreScrewed.ExecutionError)
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

			interactionCreate.reply({ embeds: [weatherEmbed] })
			.catch((error) => {
				console.log(interactionCreate)
				console.error(error)
				return interactionCreate.reply(reject.WeAreScrewed.ExecutionError)
			})

		})
	}
}
