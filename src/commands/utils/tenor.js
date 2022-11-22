const env = require("dotenv").config
const reject = require("../../../assets/items/rejection.json")
const tenorkey = process.env.tenor
const { defaultembedcolour } = require("../../../config.json")
const { EmbedBuilder } = require("discord.js")
module.exports = {
	name: "tenor",
	aliases: [],
	category: "utils",
	utilistaion: "tenor <tag>",
	desc: "Sends 1 of the random top 10 results for the provided keyword!",
	async execute(bot, messageCreate, args, prefix){
		if(!args[0]) return messageCreate.channel.send(reject.user.args.missing)
		if(args[1]) return messageCreate.channel.send(reject.user.args.toomany)
		let url = `https://g.tenor.com/v1/search?q=${args[0]}&key=${tenorkey}&limit=10`
		const fetch = await import("node-fetch")
		const output = await fetch.default(url)
		const data = await output.json()
		let selection = Math.floor(Math.random() * 9)
		const embed = new EmbedBuilder()
		embed.setColor(defaultembedcolour)
		embed.setTitle(`Search results for: ${args[0]}`)
		embed.setFooter({ text: "GIFs are from tenor.com" })
		embed.setTimestamp()
		embed.setDescription("Incoming from Tenor!")
		embed.setURL(data.results[selection].media[0].mediumgif.url)
		embed.setImage(data.results[selection].media[0].mediumgif.url)
		messageCreate.channel.send({ embeds: [embed] }).catch((error) =>{
			console.error("error", error)
			console.log(messageCreate.content)
			return messageCreate.channel.send(`${reject.ExecutionError}\n There is a chance that the gif we recevied was considered inappropriate, please run this command again!`)
		})
	}
}
