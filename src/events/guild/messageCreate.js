module.exports = async (bot, messageCreate) => {
	const { db } = require("../../../Loaders/bot.js")
	const { prefix, botID, OwnerID } = require("../../../config.json")
	const editmode = await db.get("editmode")
	const blacklisted = await db.get(`blacklisted_${messageCreate.guild.id}`)
	const reject = require("../../../assets/items/rejection.json")
	if(blacklisted == "yes") return messageCreate.channel.send(reject.BlacklistedUser)
	if(messageCreate.author.bot || messageCreate.channel.type == "dm") return
	bot.messagehelper.get("antiswear").execute(bot, messageCreate, args)
	bot.messagehelper.get("tokencheck").execute(bot, messageCreate, args)
	bot.messagehelper.get("newuser").execute(bot, messageCreate, args)
	let guildprefix = await db.get(`prefix_${messageCreate.guild.id}`)
	if(editmode == "on" && messageCreate.author.id != OwnerID) return messageCreate.channel.send()
	let botprefix = messageCreate.content.includes(guildprefix) ? guildprefix : `@<${botID}>`
	if(guildprefix == null || guildprefix == undefined) botprefix = messageCreate.content.includes(prefix) ? prefix : `<@${botID}>`
	//normally I would leave this in null, but based on some comments online on quick.db it seems that sometimes, deleting objects in the and calling it later can get undefined, while i have yet to encounter this myself as it pretty much returns null all the time, i'm leaving it like this.
	if(messageCreate.content.indexOf(guildprefix) !== 0) return
	const args = messageCreate.content.slice(guildprefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase()
	const cmd = bot.commands.get(command) || bot.commands.find(cmd => aliases && cmd.aliases.includes(command))
	if(!cmd) return
	const CommandDisable = await db.get(`DisabledCommand_${messageCreate.guild.id}_${cmd.name}`)
	const CategoryDisable = await db.get(`DisabledCategory_${messageCreate.guild.id}_${cmd.category}`)
	if(cmd.category === "over18" && !messageCreate.channel.nsfw) return messageCreate.channel.send(reject.NsfwChannelOnly)
	if(CommandDisable == null || CommandDisable == undefined) await db.set(`DisabledCommand_${messageCreate.guild.id}_${cmd.name}`)
	if(CategoryDisable == null || CategoryDisable == undefined) await db.set(`DisabledCategory_${messageCreate.guild.id}_${cmd.category}`)
	if(CommandDisable == "disabled" || CategoryDisable == "disabled") return messageCreate.channel.send(reject.DisabledCommand)
	if(cmd.maxargs) for(let i = 0; i < maxargs; i++) if(args[i+1]) return messageCreate.channel.send(reject.user.args.toomany)
	if(cmd.minperms) for(let i = 0; i < minperms.length; i++) if(!messageCreate.member.permissions.has(minperms[i])){
				const PermList = require("../../assets/items/permission.json")
				if(Array.isArray(minperms[i])){
					let query = ""
					for(let perarray = 0; perarray < minperms[i].length; perarray++){
						let a = PermList[minperms[i][perarray]]
						query + `\`${a}\``
						if(minperms[i][perarray + 1]) a + ", "
					}
				}
				let query = PermList[minperms[i]]
				return messageCreate.channel.send(`${reject.MissingPerms} \`${query}\``)
			}
	if(args[0] === "-h") return messageCreate.channel.send(cmd.utilisation)
	cmd.execute(bot, messageCreate, args, botprefix)
	.catch((err) => {
		console.error("Error!", `${err}\n\n\n\n Message: ${messageCreate.content}`)
		return messageCreate.channel.send(reject.ExecutionError)
	})
	.then(() =>{
		return console.log(`${messageCreate.author.username} ran ${cmd.name} in ${messageCreate.guild.id}`)
	})
}
