const { db } = require("../../../bot.js")
const reject = require("../../../assets/items/rejection.json")
const env = require("dotenv").config()
const { EmbedBuilder } = require("discord.js")
module.exports = {
	name: "weather",
	aliases: [],
	category: "utils",
	utilisation: "weather <destination>",
	desc: "Provides weather details using Foreca!",
	async execute(bot, messageCreate, args){
		const axios = await import("axios")
		let q = ""
		if(!args[1]) q = args[0]
		if(args[1]) q = args.join("%20")
		const options = {
			url: 'https://api.api-ninjas.com/v1/weather?city=' + q,
			headers: {
			  'X-Api-Key': process.env.rapidapiweather
			},
		}
		axios.default(options).then(function (response) {
			console.log(response.data);
			messageCreate.channel.send("Info received!")
		}).catch(function (error) {
			console.error(error)
			return messageCreate.channel.send(reject.BadApiResponse)
		});
	}
}
