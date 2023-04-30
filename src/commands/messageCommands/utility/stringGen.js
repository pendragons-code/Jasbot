const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const { stringGen } = require("../../../functions/randomGeneration/stringGen.js")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "stringgen",
	aliases: [],
	category: "utility",
	desc: "Generates random string with options!",
	utilisation: "stringgen <alphanumericals/alphabets/numbersonly/all> <character length>\nstringgen <help>",
	async execute(bot, messageCreate, args, mainPrefix) {
		let options = ["alphanumericals", "alphabets", "all", "numbersonly", "help"]
		if(!args[0] || args[0] != "help" && ! args[1]) return messageCreate.channel.send(reject.UserFault.args.missing)
		if(isNaN(args[1])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		if(args[2]) return messageCreate.channel.send(reject.UserFault.args.tooMany)
		if(parseInt(args[1]) > 2000) return messageCreate.channel.send(`${reject.UserFault.numbers.notInRange}`)
		if(!options.includes(args[0])) return messageCreate.channel.send(reject.UserFault.args.invalid)
		// moving this to an actual function.
		let set = ""
		let Caps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		let noCaps = "abcdefghijklmnopqrstuvwxyz"
		let nums = "1234567890"
		let speChar = "\"\`~@#$%^&*()_=+;',/.|{}][-\\"
		switch(args[0]) {
			case "help":
				const helpEmbed = new EmbedBuilder()
				helpEmbed.setTitle("List of options!")
				helpEmbed.setDescription(`\`options.join("`, `")\``)
				helpEmbed.setColor(Default.DefaultEmbedColor)
				helpEmbed.setFooter({ text: Default.DefaultFooterText })
				helpEmbed.setTimestamp()
				helpEmbed.setURL(Bot.BotSite)
				messageCreate.channel.send({ embeds: [helpEmbed] })
				break;

			case "numsonly":
				set = nums
				messageCreate.channel.send(stringGen(parseInt(args[1]), set))
				break;
			
			case "alphanumericals":
				set = nums + Caps + noCaps
				messageCreate.channel.send(stringGen(parseInt(args[1]), set))
				break;

			case "alphabets":
				set = Caps + noCaps
				messageCreate.channel.send(stringGen(parseInt(args[1]), set))
				break;

			case "all":
				set = nums + Caps + noCaps + speChar
				messageCreate.channel.send(stringGen(parseInt(args[1]), set))
				break;
		}
	}
}
