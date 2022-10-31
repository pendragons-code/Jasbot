const { guildconfigdb } = require("../../../bot.js")
const { EmbedBuilder, PermissionsBitField } = require("discord.js")
const reject = require("../../../assets/items/rejection.json")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
module.exports = {
	name: "disable",
	aliases: [],
	category: "moderation",
	utilisation: "disable <category/command> <category name/command name>",
	desc: "Disables commands, needs to at least have ban or kick members permissions.",
	async execute(bot, messageCreate, args, prefix){
		if(!messageCreate.member.permissions.has(PermissionsBitField.Flags.KickMembers) || !messageCreate.member.permissions.has(PermissionsBitField.Flags.BanMembers) || !messageCreate.member.permissions.has(PermissionsBitField.Flags.Administrator)) return messageCreate.channel.send(reject.MissingPerms)
		let cmd = bot.commands.get(args[1]) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[1]))
		if(args[0] != "command" && args[0] != "category") return messageCreate.channel.send(reject.user.args.invalid)
		if(!args[1]) return messageCreate.channel.send(reject.user.args.missing)
		if(args[2]) return messageCreate.channel.send(reject.user.args.toomany)
		const categories = bot.commands.map(u => u.category)
		let cats = []
		categories.forEach((element)=> {
			if(!cats.includes(element)) cats.push(element)
		})
		if(args[0] === "category" && !cats.includes(args[1])) return messageCreate.channel.send(reject.user.args.invalid)
		let categoryEmbed = new EmbedBuilder()
		categoryEmbed.setColor(defaultembedcolour)
		categoryEmbed.setDescription(`Category ${args[1]} has been disabled!`)
		categoryEmbed.setTitle("Disabling category!")
		categoryEmbed.setFooter({ text: defaultfootertext })
		categoryEmbed.setTimestamp()
		let commandEmbed = new EmbedBuilder()
		commandEmbed.setColor(defaultembedcolour)
		commandEmbed.setTimestamp()
		commandEmbed.setFooter({ text: defaultfootertext })
		commandEmbed.setTitle("Disabling command!")
		commandEmbed.setDescription(`Command ${args[1]} has been disabled!`)
		const disabledCommand = await guildconfigdb.get(`disabledCommand_${messageCreate.guild.id}_${cmd.name}`)
		const disabledCategory = await guildconfigdb.get(`disabledCategory_${messageCreate.guild.id}_${args[1]}`)
		if(disabledCommand === null && args[0] === "command") await guildconfigdb.set(`disabledCommand_${messageCreate.guild.id}_${cmd.name}`, "enabled")
		if(disabledCategory === null && args[0] === "category") await guildconfigdb.set(`disabledCategory_${messageCreate.guild.id}_${args[1]}`, "enabled")
		if(disabledCommand === "disabled") return messageCreate.channel.send("This command is already disabled!")
		if(disabledCategory === "disabled") return messageCreate.channel.send("This category is already disabled!")
		if(args[0] === "category" && cats.includes(args[1])){
			await guildconfigdb.set(`disabledCategory_${messageCreate.guild.id}_${args[1]}`, "disabled")
			messageCreate.channel.send({ embeds: [categoryEmbed] })
		}
		if(args[0] === "command" && !cmd.name) return messageCreate.channel.send(reject.user.args.invalid)
		if(args[0] === "command" && cmd.name){
			await guildconfigdb.set(`disabled_${messageCreate.guild.id}_${cmd.name}`, "disabled")
			messageCreate.channel.send({ embeds: [commandEmbed] })
			}
	}
}
