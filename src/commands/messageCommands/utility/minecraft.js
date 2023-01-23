const mcApiWrapper = require("minecraft-server-status-simple")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "mcserver",
	aliases: [],
	category: "utility",
	desc: "Sends details of minecraft servers from the `minecraft-server-status-simple` npm package!",
	utilisation: "mcserver <java/bedrock> <ip> <port>",
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[2]) return messageCreate.channel.send(reject.UserFault.args.missing)
		if(args[0] != "bedrock" && args[0] != "java") return messageCreate.channel.send(`${reject.UserFault.args.invalid}\n ${this.utilisation}`)
		if(isNaN(args[2])) return messageCreate.channel.send(`${reject.user.numbers.missing}\n ${this.utilisation}`)
		mcApiWrapper.status(args[0], args[1], parseInt(args[2]))
		.catch((error) => {
			console.error(error)
			console.log(messageCreate.content)
			return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
		})
		.then((res) => {
			const embed = new EmbedBuilder()
			embed.setColor(Default.DefaultEmbedColor)
			embed.setFooter({ text: Default.DefaultFooterText })
			embed.setTimestamp()
			embed.setTitle(res.hostname)
			embed.setDescription(`Supported Version(s): ${res.version}\n\nOnline: ${res.online}\n\nMOTD: ${res.motd.clean}`)
			embed.setURL(Bot.BotSite)
			messageCreate.channel.send({ embeds: [embed] })
			.catch((error) => {
				console.error(error)
				console.log(messageCreate.content)
				return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
			})
		})
	}
}
