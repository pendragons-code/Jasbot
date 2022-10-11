const { yards } = require("../../functions.js")
const { EmbedBuilder } = require("discord.js")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "yards",
	aliases: ["yd"],
	category: "units",
	utilisation: "yards <numerical>",
	desc: "Converts numerical value of yards to some other commonly used units.",
	async execute(bot, messageCreate, args, prefix){
		let number = parseFloat(args[0])
		if(!args[0]) return messageCreate.channel.send(reject.user.numbers.missing)
		if(args[1]) return messageCreate.channel.send(reject.user.numbers.toomany)
		if(isNaN(number)) return messageCreate.channel.send(reject.user.numbers.invalid)
		const embed = new EmbedBuilder()
		embed.setTitle("Converting")
		embed.setColor(defaultembedcolour)
		embed.setFooter({ text: defaultfootertext })
		embed.addFields({ name: "Disclaimer", value: "Figures here are rounded off by 5 significant figures." })
		embed.setDescription(yards(number))
		embed.setTimestamp()
		messageCreate.channel.send({ embeds: [embed] }).catch(()=> {
			console.err()
			return messageCreate.channel.send(reject.ExecutionError)
		})
	}
}
