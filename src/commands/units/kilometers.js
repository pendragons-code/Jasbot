const { EmbedBuilder } = require("discord.js")
const { kilometers } = require("../../functions.js")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "kilometers",
	aliases: ["km", "kilometres"],
	category: "units",
	utilisation: "km <numerical>",
	desc: "Converts numerical value of km to some other common units.",
	async execute(bot, messageCreate, args, prefix){
		let number = parseFloat(args[0])
		if(!args[0]) return messageCreate.channel.send(reject.user.numbers.missing)
		if(args[1]) return messageCreate.channel.send(reject.user.numbers.toomany)
		if(isNaN(number)) return messageCreate.channel.send(reject.user.numbers.invalid)
		const embed = new EmbedBuilder()
	}
}
