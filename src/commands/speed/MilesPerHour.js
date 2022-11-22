const { Disclaimer, Speed } = require("../../categoryembed.json")
const { MilesPerHour } = require("../../functions.js")
const { EmbedBuilder } = require("discord.js")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "Miles/h",
	aliases: [],
	category: "speed",
	utilisation: "Miles/h <numerical value>",
	desc: Speed,
	async execute(bot, messageCreate, args, prefix){
		let number = parseFloat(args[0])
		if(!args[0]) return messageCreate.channel.send(reject.user.numbers.missing)
		if(isNaN(number)) return messageCreate.channel.send(reject.user.numbers.toomany)
		if(args[1]) return messageCreate.channel.send(reject.user.numbers.invalid)
		const embed = new EmbedBuilder()
		embed.addFields({ name: Disclaimer.name, value: Disclaimer.value })
		embed.setDescription(MilesPerHour(number))
		embed.setColor(defaultembedcolour)
		embed.setFooter({ text: defaultfootertext })
		embed.setTimestamp()
		embed.setTitle("Converting!")
		messageCreate.channel.send({ embeds: [embed] }).catch((error)=>{
			console.error("error", error)
			console.log(messageCreate.content)
			messageCreate.channel.send(reject.ExecutionError)
		})
	}
}
