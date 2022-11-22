const { userdb } = require("../../../bot.js")
const { EmbedBuilder } = require("discord.js")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "cmdran",
	aliases: ["totalcmd"],
	category: "utils",
	utilisation: "cmdran <@user>",
	desc: "Sends the details of number of commands ran!",
	async execute(bot, messageCreate, args, prefix){
		let user = messageCreate.mentions.user.first()
		if(!user || user === null) user = messageCreate.author
		let cmdran = await userdb.get(`cmdran_${user.id}`)
		const embed = new EmbedBuilder()
		embed.setColor(defaultembedcolour)
		embed.seFooter({ text: defaultfootertext })
		embed.setTitle("Total commands ran!")
		embed.setTimestamp()
		embed.setDescription(`${user.username} ran a total of ${cmdran} commands!`)
		messageCreate.channel.send({ embeds: [embed] }).catch((error) =>{
			console.error("error", error)
			return messageCreate.channel.send(reject.ExecutionError)
		})
	}
}
