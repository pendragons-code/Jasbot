const env = require("dotenv").config()
const axios = require("axios")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { Default } = require("../../../../config.json")
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")

module.exports = {
	name: "tenor",
	category: "utility",
	description: "Sends 1 random result from the top 10 from the provided tag.",
	utilisation: "tenor <tag>",
	options: [
		{
			name: "tag",
			description: "A search term for the gifs.",
			type: ApplicationCommandOptionType.String,
			required: true
		}
	],
	async execute(bot, interactionCreate) {
		await axios({
			method: "GET",
			url: `https://g.tenor.com/v1/search?q=${interactionCreate.options._hoistedOptions[0].value}&key=${process.env.TenorKey}&limit=10`,
			headers: {
				"Content-Type": "application/json"
			}
		})
		.catch((error) => {
			console.error(error)
			console.error(interactionCreate)
			return interactionCreate.reply(reject.WeAreScrewed.ExecutionError)
		})
		.then(async (results) => {
			let selection = Math.floor(Math.random() * 9)
			let tenorEmbed = new EmbedBuilder()
			tenorEmbed.setColor(Default.DefaultEmbedColor)
			tenorEmbed.setTimestamp()
			tenorEmbed.setFooter({ text: "These GIFs are from tenor.com!" })
			tenorEmbed.setTitle("Incoming GIF from tenor!")
			tenorEmbed.setURL(results.data.results[selection].media[0].mediumgif.url)
			tenorEmbed.setImage(results.data.results[selection].media[0].mediumgif.url)
			tenorEmbed.setDescription(`Providing search results for: ${interactionCreate.options._hoistedOptions[0].value}`)
			return interactionCreate.reply({ embeds: [tenorEmbed] })
			.catch((error) => {
				console.error(error)
				console.error(interactionCreate)
				return interactionCreate.reply(`${reject.WeAreScrewed.ExecutionError}\nThe command may not work if the requested content is nsfw!`)
			})
		})
	}
}
