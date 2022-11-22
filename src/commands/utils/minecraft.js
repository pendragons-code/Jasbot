const mc = require("minecraft-server-status-simple")
const { EmbedBuilder } = require("discord.js")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "mcserver",
	aliases: [],
	category: "utils",
	utilisation: "mcserver <java/bedrock> <ip> <port>",
	desc: "Sends details of minecraft servers from the `minecraft-server-status-simple` npm package.",
	async execute(bot, messageCreate, args, prefix){
		if(!args[0] || !args[1] || args[2]) return messageCreate.channel.send(reject.user.args.missing)
		if(args[0] != "bedrock" && args[0] != "java") return messageCreate.channel.send(`${reject.user.args.invalid}\n ${this.utilisation}`)
		if(isNaN(parseInt(args[2]))) return messageCreate.channel.send(`${reject.user.numbers.missing}\n ${this.utilisation}`)
		mc.status(args[0], args[1], parseInt(args[2])).then((res)=> {
			const embed = new EmbedBuilder
			embed.setColor(defaultembedcolour)
			embed.setFooter(defaultfootertext)
			embed.setTimestamp()
			embed.setTitle(res.hostname)
			embed.setDescription(`Supported Version(s): ${res.version}\n\n Online: ${res.online}\n\n  MOTD: ${res.motd.clean}`)
			messageCreate.channel.send({ embeds: [embed] })
		}).catch((error) =>{
			console.error("error", error)
			console.log(messageCreate.content)
			return messageCreate.channel.send(reject.ExecutionError)
		})
	}
}
