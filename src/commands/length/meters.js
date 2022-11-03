const { meters } = require("../../functions.js")
const { EmbedBuilder } = require("discord.js")
const { Disclaimer } = require("../../categoryembed.json")
const reject = require("../../../assets/items/rejection.json")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
module.exports = {
	name: "meters",
	aliases: ["metres"],
	category: "length",
	utilisation: "meters <numerical>",
	desc: "Converts numerical value of meters to some other commonly used units.",
	async execute(bot, messageCreate, args, prefix){
		let number = parseFloat(args[0])
		if(!args[0]) return messageCreate.channel.send(reject.user.numbers.missing)
		if(args[1]) return messageCreate.channel.send(reject.user.numbers.toomany)
		if(isNaN(number)) return messageCreate.channel.send(reject.user.number.invalid)
		const embed = new EmbedBuilder()
		embed.setTitle("Converting")
		embed.setDescription(meters(number))
		embed.setColor(defaultembedcolour)
		embed.setFooter({ text: defaultfootertext })
		embed.addFields({ name: Disclaimer.name, value: Disclaimer.value })
		embed.setTimestamp()
		messageCreate.channel.send({ embeds: [embed] }).catch(()=> {
			console.err()
			return messageCreate.channel.send(reject.ExecutionError)
		})

	}
}
