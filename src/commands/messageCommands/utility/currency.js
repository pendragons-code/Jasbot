const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const env = require("dotenv").config()
const reject = require("../../../../assets/responseComponents/rejection.json")
const currencyApiKey = process.env.RapidCurrency
module.exports = {
	name: "currency",
	aliases: ["convertcurrency", "currencyconvert"],
	category: "utility",
	desc: "Converts amount from one currency to another!",
	utilisation: "currency <from> <to> <amount>",
	async execute(bot, messageCreate, args, mainPrefix) {
		const axios = await import("axios")
		// note that this is ESM
		let list = ['SGD', 'MYR', 'EUR','USD', 'AUD', 'JPY','CNH', 'HKD', 'CAD','INR', 'DKK', 'GBP','RUB', 'NZD', 'MXN','IDR', 'TWD', 'THB','VND']
		if(args[0] == "list") return messageCreate.channel.send(list.join(", "))
		if(!args[0] || !args[2]) return messageCreate.channel.send(reject.UserFault.args.missing)
		// there cannot be args[2] without args[1]
		if(isNaN(parseFloat(args[2]))) return messageCreate.channel.send(reject.UserFault.numbers.missing)
		if(parseFloat(args[2]) < 0 || parseFloat(args[2]) == 0) return messageCreate.channel.send(reject.UserFault.numbers.notInRange)
		if(!list.includes(args[0])) return messageCreate.channel.send(`${reject.UserFault.args.invalid}\n Reference: **${args[0]}**`)
		if(!list.includes(args[1])) return messageCreate.channel.send(`${reject.UserFault.args.invalid}\n Reference: **${args[1]}**`)
		let options = {
			method: "GET",
			url: "https://currency-exchange.p.rapidapi.com/exchange",
			params: { to: args[1], from: args[0], q: args[2] },
			headers: {
				"x-rapidapi-host": "currency-exchange.p.rapidapi.com",
				"x-rapidapi-key": currencyApiKey
			}
		}
		let response = await axios.default(options)
		if(response.message) return messageCreate.channel.send(reject.WeAreScrewed.BadApiResponse)
		const convertedEmbed = new EmbedBuilder()
		convertedEmbed.setTitle("Converted Amount!")
		convertedEmbed.setDescription(`$${args[0]}${args[2]} is $${args[1]}${response.data}!`)
		convertedEmbed.setURL(Bot.BotSite)
		convertedEmbed.setFooter({ text: DefaultFooterText })
		convertedEmbed.setColor(Default.DefaultEmbedColor)
		convertedEmbed.setTimestamp()
		messageCreate.channel.send({ embeds: [embed] })
		.catch((error) => {
			console.error(error)
			return messageCreate.channel.send(reject.WeAreScrewed.BadApiResponse)
		})
	}
}
