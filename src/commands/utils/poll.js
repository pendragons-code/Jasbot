const { EmbedBuilder } = require("discord.js")
const { defaultembedcolour, defaultfootertext } = require("../../../config.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
  name: 'poll',
    aliases: [],
    category: 'utils',
    utilisation: "poll <number of emojis> <emoji[scalable]> <poll stuff here>\n (e.g.) poll 5 😃 🐻 🍔 ⚽ 🚀 Which emoji here do you all like most?",
    desc: "Initiates polls with spedcified fields!",
async execute(bot, messageCreate, args, prefix) {
	if(!args[2]) return messageCreate.channel.send(reject.user.args.missing)
	if(parseInt(args[0]) < 1) return messageCreate.channel.send(reject.user.numbers.invalid)
	let i = 0;
	let embed = new EmbedBuilder()
	embed.setTitle("TIME TO VOTE!")
	embed.setColor(defaultembedcolour)
	embed.setFooter({ text: defaultfootertext })
	embed.setTimestamp()
	embed.setDescription(`${args.slice(parseInt(args[0]) + 1).join(" ")}`)
	messageCreate.channel.send({embeds: [embed]})
		.then(embedMessage => {
			while (i < parseInt(args[0])){
				try{
					embedMessage.react(args[i+1])
				}catch(e){
					return messageCreate.reply(`${reject.ExecutionError}\nSomething went wrong, you may have stated the fields wrongly! Ensure that you have emojis in your arguments and the number you provided is the same as the number of emojis!`)
				}
	    			i++
			}
		})
	}
}
