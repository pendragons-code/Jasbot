const { guildconfigdb } = require("../../../bot")
const { EmbedBuilder } = require("discord.js")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "prefix",
	aliases: [],
	category: "core",
	desc: "Changes bot prefix",
	utilisation: "prefix <new prefix>",
	async execute(bot, messageCreate, args, prefix){
		let newprefix = await guildconfigdb.get(`prefix_${messageCreate.guild.id}`)
		if(!args[0]) return messageCreate.channel.send(reject.user.args.missing)
		if(args[1]) return messageCreate.channel.send(reject.user.args.toomany)
		guildconfigdb.set(`prefix_${messageCreate.guild.id}`, args[0])
		.catch(() => { return messageCreate.channel.send(reject.ExecutionError) })
		const embed = new EmbedBuilder()
		embed.setColor(defaultembedcolour)
		embed.setFooter({ text: defaultfootertext })
		embed.setTitle("New prefix!")
		embed.setTimestamp()
		embed.setDescription(`The prefix for this guild has been changed to ${newprefix}`)
		messageCreate.channel.send({ embeds: [embed] })
	}
}
