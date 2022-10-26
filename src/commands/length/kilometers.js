const { Disclaimer } = require("../../categoryembed.json")
const { EmbedBuilder } = require("discord.js")
const { kilometers } = require("../../functions.js")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "kilometers",
	aliases: ["km", "kilometres"],
	category: "length",
	utilisation: "km <numerical>",
	desc: "Converts numerical value of km to some other common units.",
	async execute(bot, messageCreate, args, prefix){
		let number = parseFloat(args[0])
		if(!args[0]) return messageCreate.channel.send(reject.user.numbers.missing)
		if(args[1]) return messageCreate.channel.send(reject.user.numbers.toomany)
		if(isNaN(number)) return messageCreate.channel.send(reject.user.numbers.invalid)
		const embed = new EmbedBuilder()
		embed.setTitle("Converting")
		embed.setColor(defaultembedcolour)
		embed.setFooter({ text: defaultfootertext })
		embed.addFields({ name: Disclaimer.name, value: Disclaimer.value })
		embed.setDescription(kilometers(number))
		embed.setTimestamp()
		messageCreate.channel.send({ embeds: [embed] }).catch(()=> {
			console.err()
			return messageCreate.channel.send(reject.ExecutionError)
		})

	}
}
