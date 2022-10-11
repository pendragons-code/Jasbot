const { EmbedBuilder } = require("discord.js")
const reject = require("../../../assets/items/rejection.json")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
module.exports = {
	name: "stringgen",
	aliases: [],
	category: "utils",
	desc: "Generates random string with options.",
	utilisation: "stringgen <alphanumericals/alphabets/numsonly/all> <number>",
	async execute(bot, messageCreate, args, prefix){
		let options = [`alphanumericals`, `alphabets`, `numsonly`, `all`]
		let Caps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		let NoCaps = "abcdefghijklmnopqrstuvwxyz"
		let nums = "1234567890"
		let spechar = "\"\`~@#$%^&*()_=+;',/.|{}][-\\"
		let set = ""
		function stringgen(length, set){
			for(var i = 0; i < length; i++ ){
				result += set.charAt(Math.floor(Math.random() * set.length))
			}
		}
		const listembed = new EmbedBuilder()
		listembed.setTitle("List!")
		listembed.setFooter({ text: defaultfootertext })
		listembed.setColor(defaultembedcolour)
		listembed.setDescription(options.join(", "))
		listembed.setTimestamp()
		if(!args[0] && !args[1]) return messageCreate.channel.send({ embeds: [listembed] })
		if(isNaN(parseInt(args[1]))) return messageCreate.channel.send(reject.user.numbers.invalid)
		if(!options.includes(args[0])) return messageCreate.channel.send(reject.user.args.invalid)
		switch(args[0]){
			case "numsonly":
			 	set = nums
				stringgen(parseInt(args[1]), set)
				break;
			case "alphanumericals":
				set = nums + Caps + NoCaps
				stringgen(parseInt(args[1]), set)
				break;
			case "alphabets":
				set = Caps + NoCaps
				stringgen(parseInt(args[1]), set)
				break;
			case "all":
				set = nums + Caps + Nocaps +spechar
				stringgen(parseInt(args[1]), set)
		}
	}
}
