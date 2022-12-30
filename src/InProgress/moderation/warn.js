const { EmbedBuilder, PermissionsBitField } = require("discord.js")
const { warn, getUserFromMention } = require("../../functions.js")
const reject = require("../../../assets/items/rejection.json")
const { defaultembedcolour, defaultfootertext } = require("../../../config.json")
module.exports = {
	name: "warn",
	aliases: [],
	category: "moderation",
	desc: "Sends warning to mentioned user!",
	utility: "warn <@user> <reason>",
	async execute(bot, messageCreate, args, prefix){
		if(!messageCreate.member.permissions.has([PermissionsBitField.Flags.KickMembers]) ||!messageCreate.member.permissions.has([PermissionsBitField.Flags.BanMembers]) ||!messageCreate.member.permissions.has([PermissionsBitField.Flags.Administrator])) return messageCreate.channel.send(reject.MissingPerms)
		let user = getUserFromMention(args[0])
		const embed = new EmbedBuilder()
		if(!user) return messageCreate.channel.send(reject.user.mention.invalid)
		if(!args[0]) return messageCreate.channel.send(reject.user.mention.missing)
		if(user.id === messageCreate.author.id) return messageCreate.channel.send("You need to select another user!")
		let targetperms = await messageCreate.guild.members.fetch(user)
		if(targetperms.permissions.has([PermissionsBitField.Flags.KickMembers]) || targetperms.permissions.has([PermissionsBitField.Flags.BanMembers])) return messageCreate.channel.send("This user has `KICK MEMBERS` and/or `BAN MEMBERS` permissions tied to them, therefor I cannot kick them! Please try again after removing these permissions!")
		let reason = args.slice(1).join(" ")
		if(!reason) reason = "No reason was provided!"
		embed.setDescription(`${user} was warned by ${messageCreate.author} due to: ${reason}`)
		embed.setColor(defaultembedcolour)
		embed.setFooter({ text: defaultfootertext })
		embed.setTitle(`WARNING! ${user}`)
		embed.setTimestamp()
		warn(messageCreate.author.id, messageCreate.guild.id, user.id, reason).catch((error)=>{
			console.error(error)
			messageCreate.channel.send(reject.ExecutionError)
			return console.log(messageCreate.content)
		})
		.then(()=>{
			messageCreate.channel.send({ embeds: [embed] })
		})
	}
}
