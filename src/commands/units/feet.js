const { feet } = require("../../functions.js")
const { EmbedBuilder } = require("discord.js")
const { defaultembedcolour, defaultfootertext } = require("../../../config.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "feet",
	aliases: [],
	category: "units",
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
		embed.setTitle("Converting feet to some other common units.")
		embed.setDescription(`Note that the numbers here are an estimate.\n ${feet(parseFloat(args[0]))}`)
	}
}
