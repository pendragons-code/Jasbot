const { EmbedBuilder } = require("discord.js")
const { moderationdb } = require("../../../bot.js")
const { getUserFromMention } = require("../../functions.js")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "warnhis",
	aliases: [],
	category: "moderation",
	desc: "Sends warn history of specified warn.",
	utilisation: "warnhis <number from to true warn> <@user>",
	async execute(bot, messageCreate, args, prefix){
		let user = getUserFromMention(args[1])
		let number = parseInt(args[0])
		if(!args[0] || !args[1]) return messageCreate.channel.send(reject.user.args.missing)
		if(isNaN(number)) return messageCreate.channel.send()
		const embed = new EmbedBuilder()
		if(!user) user = messageCreate.author
		let warncount = await moderationdb.get(`warncount_${guildID}_${user.id}`)
		const warnhismoderator = await moderationdb.get(`warnhistory_${number}_${messageCreate.guild.id}_${user.id}.moderatorID`)
		const warnhistoryreason = await moderationdb.get(`warnhistory_${number}_${messageCreate.guild.id}_${user.id}.reasonforwarn`)
		if(warncount === null || warncount == "0") return messageCreate.channel.send("This user does not have any warns at all!")
		if(number > parseInt(warncount)) return messageCreate.channel.send("This user does not have that many warns!")
		embed.setTitle(`${user}'s warn history!`)
		embed.setColor(defaultembedcolour)
		embed.setFooter({ text: defaultfootertext })
		embed.setTimestamp()
		embed.setDescription(`Moderator's ID: ${warnhismoderator}\n Reason for warn issued: ${warnhistoryreason}`)
		// Remember to update this since the other component is not done!
		messageCreate.channel.send({ embeds: [embed] })
	}
}
