const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "poll",
	aliases: [],
	category: "utility",
	utilisation: "poll <number of emojis> <emojis [scalable] <words here>\npoll 5 🙂 🔗 👍 🔥 😭 Which emoji here do you all like most?",
	desc: "Initiates polls with specified fields!",
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[2]) return messageCreate.channel.send(reject.UserFault.args.invalid)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		if(parseInt(args[0]) < 1) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		let embed = new EmbedBuilder()
		embed.setTitle("Time to vote!")
		embed.setColor(Default.DefaultEmbedColor)
		embed.setFooter({ text: Default.DefaultFooterText })
		embed.setTimestamp()
		embed.setDescription(`${args.slice(parseInt(args[0]) + 1).join(" ")}`)
		embed.setURL(Bot.BotSite)
		messageCreate.channel.send({ embeds: [embed] })
		.then(embedMessage => {
			while(i < parseInt(args[0])) {
				embedMessage.react(args[i+1])
				.catch((error) => {
					console.error(error)
					return messageCreate.reply(`${reject.WeAreScrewed.ExecutionError}\n Something went wrong! Contact the dev should the issue persists!`)
				})
			}
		})
	}
}
