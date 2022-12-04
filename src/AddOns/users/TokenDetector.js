const env = require("dotenv").config()
const { OwnerID } = require("../../../config.json")
const { EmbedBuilder } = require("discord.js")
module.exports = {
	name: "TokenDetector",
	async execute(Jasbot, messageCreate, args){
		const token = process.env.token
		if(!messageCreate.content.includes(token)) return
		
		const embed = new EmbedBuilder()
		embed.setTitle("Token Compromised! Reset token immediately!")
		embed.setDescription(`${messageCreate.author.id} from ${messageCreate.guild.id} in ${messageCreate.channel.id} said: ${messageCreate.content}`)
		Jasbot.users.cache.get(OwnerID).send({ embeds: [embed] })
		.catch((error) => {
			console.error("Error", error)
			console.log("Error! TOKEN COMPROMISED! RESET TOKEN IMMEDIATELY!!!!!!")
		})
		.then(() => {
			process.kill(process.pid, 'SIGTERM')
		})
	}
}
