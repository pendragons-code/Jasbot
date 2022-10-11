const { inches } = require("../../functions.js")
const { EmbedBuilder } = require("discord.js")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "inches",
	aliases: ["in"],
	category: "units",
	desc: "Sends specified distance in inches converted to some other commonly used units.",
	utilisation: "inches <numerical>",
	async execute(bot, messageCreate, args, prefix){
		let number = parseFloat(args[0])
		if(args[1]) return messageCreate.channel.send(reject.user.args.toomany)
		if(!args[0]) return messageCreate.channel.send(reject.user.number.missing)
		if(isNaN(number)) return messageCreate.channel.send(reject.user.numbers.invalid)
		const embed = new EmbedBuilder()
		embed.setColor(defaultembedcolour)
		embed.setFooter({ text: defaultfootertext })
		embed.setTitle("Converting!")
		embed.setTimestamp()
		embed.setDescription(inches(number))
		embed.addFields({ name: "Disclaimer", value: " Figures here are rounded off by 5 significant figures."})
		messageCreate.channel.send({ embeds: [embed] }).catch(() => {
			console.err()
			return messageCreate.channel.send(reject.ExecutionError)
		})
	}
}
