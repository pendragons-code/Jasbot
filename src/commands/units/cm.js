const reject = require("../../../assets/items/rejection.json")
const { EmbedBuilder } = require("discord.js")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
const { cm } = require("../../functions.js")
module.exports = {
	name: "cm",
	aliases: [],
	category: "units",
	utilisation: "cm <numerical>",
	desc: "Converts numerical value of cm to some other common units.",
	async execute(bot, messageCreate, args, prefix){
		if(!args[0]) return messageCreate.channel.send(reject.user.numbers.missing)
		if(args[1]) return messageCreate.channel.send(reject.user.numbers.toomany)
		if(isNaN(parseFloat(args[0]))) return messageCreate.channel.send(reject.user.numbers.invalid)
		let number = parseFloat(args[0])
		const embed = new EmbedBuilder()
		embed.setColor(defaultembedcolour)
		embed.setTimestamp()
		embed.setFooter({ text: defaultfootertext })
		embed.addFields({ name: "Disclaimer", value: "Figures here are rouded off by 5 significant figures." })
		embed.setDescription(cm(number))
		embed.setTitle("Converting!")
		messageCreate.channel.send({ embeds: [embed] }).catch(()=> {
			console.err()
			return messageCreate.channel.send(reject.ExecutionError)
		})
	}
}
