const { EmbedBuilder } = require("discord.js")
const { defaultembedcolour, defaultfootertext } = require("../../../config.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "fahrenheit",
	aliases: [],
	category: "temperature",
	desc: "Converting fahrenheit to some other common units of temperature.",
	utilisation: "fahrenheit <temperature in fahrenheit>",
	async execute(bot, messageCreate, args, prefix){
		if(!args[0]) return messageCreate.channel.send(reject.user.numbers.missing)
		if(args[1]) return messageCreate.channel.send(reject.user.args.toomany)
		if(isNaN(parseFloat(args[0]))) return messageCreate.channel.send(reject.user.numbers.invalid)
		let kelvin = (parseFloat(args[0]) - 32 ) * 5/9 + 273.15
		let celsius = (parseFloat(args[0]) - 32 ) * 5/9
		let desc = `${args[0]} degrees fahrenheit is equal to:\n${kelvin} kelvin \n${celsius} celsius`
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
