const { EmbedBuilder } = require("discord.js")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
const { FootPerSecond } = require("../../functions.js")
const { Disclaimer, Speed } = require("../../categoryembed.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "f/s",
	aliases: [],
	category: "speed",
	desc: Speed,
	utilisation: "FootPerSecond <numerical value>",
	async execute(bot, messageCreate, args, prefix){
		let number = parseFloat(args[0])
		if(!args[0]) return messageCreate.channel.send(reject.user.numbers.missing)
		if(args[1]) return messageCreate.channel.send(reject.user.numbers.toomany)
		if(isNaN(number)) return messageCreate.channel.send(reject.user.numbers.invalid)
		const embed = new EmbedBuilder()
		embed.setColor(defaultembedcolour)
		embed.setTitle("Converting!")
		embed.setFooter({ text: defaultfootertext })
		embed.addFields({ name: Disclaimer.name, value: Disclaimer.value })
		embed.setDescription(FootPerSecond(number))
		messageCreate.channel.send({ embeds: [embed] }).catch((error)=>{
			console.error("error", error)
			console.log(messageCreate.content)
			return messageCreate.channel.send(reject.ExecutionError)
		})
	}
}
