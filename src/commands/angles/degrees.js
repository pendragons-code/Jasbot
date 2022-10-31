const { degrees } = require("../../functions.js")
const { EmbedBuilder } = require("discord.js")
const {defaultembedcolour, defaultfootertext } = require("../../../config.json")
const { Disclaimer } = require("../../categoryembed.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "degrees",
	aliases: ["degree"],
	category: "angles",
	desc: "Sends value of degrees in other units of angles.",
	utilisation: "degrees <value in degree>",
	async execute(bot, messageCreate, args, prefix){
		let number = parseFloat(args[0])
		if(!args[0]) return messageCreate.channel.send(reject.user.numbers.missing)
		if(args[1]) return messageCreate.channel.send(reject.user.numbers.toomany)
		if(isNaN(number)) return messageCreate.channel.send(reject.user.numbers.invalid)
		const embed = new EmbedBuilder()
		embed.setColor(defaultembedcolour)
		embed.setFooter({ text: defaultfootertext })
		embed.setTimestamp()
		embed.setTitle("Converting!")
		embed.setDescription(degrees(number))
		embed.addFields({ name: Disclaimer.name, value: Disclaimer.value })
		messageCreate.channel.send({ embeds: [embed] })
	}
}