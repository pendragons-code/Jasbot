const { EmbedBuilder, PermissionsBitField } = require("discord.js")
const { defaultembedcolour, defaultfootertext } = require("../../../config.json")
const reject = require("../../../assets/items/rejection.json")
const { moderationdb } = require("../../../bot.js")
const { getUserFromMention } = require("../../functions.js")
module.exports = {
	name: "warncount",
	aliases:[],
	category: "moderation",
	desc: "Provides warncount. Using the --true flag allows the user to see the true number of warns a user has, before unwarns were counted.",
	utilisation: "warncount <@user/--true/?> <--true>\nwarncount",
	async execute(bot, messageCreate, args, prefix){
		const embed = new EmbedBuilder()
		embed.setTitle("Warncount")
		embed.setFooter({ text: defaultfootertext })
		embed.setColor(defaultembedcolour)
		embed.setDescription("True warns refer to the number of warns issued to the user without removing the number of warns that has been revoked. This is helpful as you can use this alongside with the `warnhis` command!")
		embed.setTimestamp()
		let user = getUserFromMention(args[0])
		if(args[0] === "--true" || !args[0]) user = messageCreate.author
		let warncount = await moderationdb.get(`warncount_${messageCreate.guild.id}_${user.id}`)
		if(warncount === null) warncount = 0
		let unwarncount = await moderationdb.get(`unwarncount_${messageCreate.guild.id}_${user.id}`)
		if(unwarncount === null) unwarncount = 0
		let simplifiedwarn = parseInt(warncount) - parseInt(unwarncount)
		if(args[0] === "--true" || args[1] === "--true") embed.addFields({ name: "True warns:", value: warncount}, { name: "Revoked warns:", value: unwarncount })
		if(args[0] != "--true" && args[1] != "--true" || !args[0]) embed.addFields({ name: "Warns", value: simplifiedwarn })
		messageCreate.channel.send({ embeds: [embed] }).catch((error)=>{
			console.error(error)
			messageCreate.channel.send(reject.ExecutionError)
			console.log(messageCreate.content)
		})
	}
}
