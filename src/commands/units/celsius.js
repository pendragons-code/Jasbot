const reject = require("../../../assets/items/rejection.json")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
const { EmbedBuilder } = require("discord.js")
module.exports = {
	name: "celsius",
	aliases: [],
	category: "units",
	utilisation: "celsius <tempertature>",
	desc: "Returns converted values for kelvin and fahrenheit.",
	async execute(bot, messageCreate, args, prefix){
		if(!args[0]) return messageCreate.channel.send(reject.user.numbers.missing)
		if(args[1]) return messageCreate.channel.send(reject.user.args.toomany)
		if(parseFloat(args[0])) return messageCreate.channel.send(reject.user.number.invalid)
		let kelvin = parseFloat(args[0]) + 273.15
		let fahrenheit = (parseFloat(args[0]) * 1.8) + 32
		let desc = `${args[0]} degrees celsius is equal to:\n${kelvin} kelvin\n${fahrenheit} fahrenheit`
		const embed = new EmbedBuilder()
		embed.setColor(defaultembedcolour)
		embed.setTimestamp()
		embed.setFooter({ text: defaultfootertext })
		embed.setDescription(desc)
		embed.setTitle("Conversion of units of temperature!")
		messageCreate.channel.send({ embeds: [embed] })
	}
}
