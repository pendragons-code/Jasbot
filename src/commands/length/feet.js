const { feet } = require("../../functions.js")
const { EmbedBuilder } = require("discord.js")
const { defaultembedcolour, defaultfootertext } = require("../../../config.json")
const { Disclaimer } = require("../../categoryembed.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "feet",
	aliases: [],
	category: "length",
	desc: "Send specified distance in feet converted to some other commonly used units.",
	utilisation: "feet < distance in feet >",
	async execute(bot, messageCreate, args, prefix){
		if(args[1]) return messageCreate.channel.send(reject.user.args.toomany)
		if(!args[0]) return messageCreate.channel.send(reject.user.numbers.missing)
		if(isNaN(parseFloat(args[0]))) return messageCreate.channel.send(reject.user.numbers.invalid)
		const embed = new EmbedBuilder()
		embed.setFooter({ text: defaultfootertext })
		embed.setColor(defaultembedcolour)
		embed.setTimestamp()
		embed.setTitle("Converting!")
		embed.addFields({ name: Disclaimer.name, value: Disclaimer.value })
		embed.setDescription(`${feet(parseFloat(args[0]))}`)
		messageCreate.channel.send({ embeds: [embed] }).catch(()=> {
			console.err()
			return messageCreate.channel.send(reject.ExecutionError)
		})

	}
}
