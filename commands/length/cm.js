const { Disclaimer } = require("../../categoryembed.json")
const reject = require("../../../assets/items/rejection.json")
const { EmbedBuilder } = require("discord.js")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
const { cm } = require("../../functions.js")
module.exports = {
	name: "cm",
	aliases: ["centimeters", "centimetres"],
	category: "length",
	utilisation: "cm <numerical>",
	desc: "Converts numerical value of cm to some other common units.",
	async execute(bot, messageCreate, args, prefix){
		let number = parseFloat(args[0])
		if(!args[0]) return messageCreate.channel.send(reject.user.numbers.missing)
		if(args[1]) return messageCreate.channel.send(reject.user.numbers.toomany)
		if(isNaN(number)) return messageCreate.channel.send(reject.user.numbers.invalid)
		const embed = new EmbedBuilder()
		embed.setColor(defaultembedcolour)
		embed.setTimestamp()
		embed.setFooter({ text: defaultfootertext })
		embed.addFields({ name: Disclaimer.name, value: Disclaimer.value })
		embed.setDescription(cm(number))
		embed.setTitle("Converting!")
		messageCreate.channel.send({ embeds: [embed] }).catch(()=> {
			console.err()
			return messageCreate.channel.send(reject.ExecutionError)
		})
	}
}
