const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const axios = require("axios")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "lyrics",
	aliases: [],
	category: "utility",
	utilisation: "lyrics <here> <query>",
	desc: "Sends lyrics/link in current channel!",
	async execute(bot, messageCreate, args, mainPrefix) {
		let results = await axios({
			method: "get",
			url: "https://some-random-api.ml/lyrics?title?=",
			headers: {
				"Content-Type": "application/json",
				"Accept-Encoding": "gzip,deflate,compress"
			}
		})
		if(!results.links.genius) return messageCreate.channel.send(reject.WeAreScrewed.BadApiResponse)
		if(results.data.error) return messageCreate.channel.send(reject.WeAreScrewed.BadApiResponse)
		//vulgar check
		if(results.data.lyrics.includes())
	}
}
