const env = require("dotenv").config()
const axios = require("axios")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { Default } = require("../../../../config.json")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "tenor",
	aliases: [],
	category: "utility",
	utilisation: "tenor <tag>",
	desc: "Sends 1 random result of the top 10 from the provided tag.",
	async execute(bot, messageCreate, args, mainPrefix) {
		const TenorKey = process.env.TenorKey
		let results = await axios({
			method: "get",
			url: `https://g.tenor.com/v1/search?q=${args[0]}&key=${TenorKey}&limit=10`,
			headers: {
				"Content-Type": "application/json"
			}
		})
		let selection = Math.floor(Math.random() * 9)
		const tenorEmbed = new EmbedBuilder()
		tenorEmbed.setColor(Default.DefaultEmbedColor)
		tenorEmbed.setTimestamp()
		tenorEmbed.setFooter({ text: "These GIFs are from tenor.com!" })
		tenorEmbed.setTitle("Incoming GIF from tenor!")
		tenorEmbed.setURL(results.data.results[selection].media[0].mediumgif.url)
		tenorEmbed.setImage(results.data.results[selection].media[0].mediumgif.url)
		tenorEmbed.setDescription(`Providing search results for: ${args[0]}`)
		messageCreate.channel.send({ embeds: [tenorEmbed] })
		.catch((error) => {
			console.error(error)
			console.log(messageCreate.content)
			return messageCreate.channel.send(`${reject.WeAreScrewed.ExecutionError}\nThe command may not work if the requested content is nsfw!`)
		})
	}
}
