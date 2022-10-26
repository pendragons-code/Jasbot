const { EmbedBuilder } = require("discord.js")
const { defaultembedcolour, defaultfootertext } = require("../../../config.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "kelvin",
	aliases: [],
	category: "temperature",
	desc: "Converting kelvin to some other common units of temperature.",
	utilisation: "kelvin <temperature in fahrenheit>",
	async execute(bot, messageCreate, args, prefix){
		if(!args[0]) return messageCreate.channel.send(reject.user.numbers.missing)
		if(args[1]) return messageCreate.channel.send(reject.user.args.toomany)
		if(isNaN(parseFloat(args[0]))) return messageCreate.channel.send(reject.user.numbers.invalid)
		let celsius = (parseFloat(args[0]) - 273.15)
		let fahrenheit = (parseFloat(args[0]) - 273.15) * 1.8 + 32
		let desc = `${args[0]} kelvin(s) is equal to:\n${fahrenheit} fahrenheit \n${celsius} celsius`
		const embed = new EmbedBuilder()
		embed.setTitle("Conversion!")
		embed.setColor(defaultembedcolour)
		embed.setFooter({ text: defaultfootertext })
		embed.setDescription(desc)
		embed.setTimestamp()
		messageCreate.channel.send({ embeds: [embed] }).catch(() => {
			console.err()
			return messageCreate.channel.send(reject.ExecutionError)
		})
	}
}
