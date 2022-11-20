module.exports = async (bot, messageCreate) => {
	const env = require("dotenv").config()
	const { botconfigdb, userdb, guildconfigdb } = require("../../bot.js")
	const config = require("../../config.json")
	let editmode = await botconfigdb.get('editmode')
	let blacklisted = await userdb.get(`blacklisted_${messageCreate.author.id}`)
	if(messageCreate.content.includes(process.env.token)) return bot.users.cache.get(config.OwnerID).send("Token Compromised! Reset bot token immediately!")
	const reject = require("../../assets/items/rejection.json")
	if (blacklisted == "yes") return messageCreate.channel.send(reject.BlacklistedUser)
	if(messageCreate.author.bot || messageCreate.channel.type == "dm") return
	const res2 = bot.structures.get("antiswear")
	res2.execute(bot, messageCreate)
	if(editmode === null) editmode = 1
	if(editmode == 0 && messageCreate.author.id != config.OwnerID) return messageCreate.channel.send("The bot is currently in editmode, there are some changes being made to the bot! Please wait for maintainence to be completed before trying again!")
	let guildprefix = await guildconfigdb.get(`prefix_${messageCreate.guild.id}`)
	let prefix = ''
	if(!guildprefix || guildprefix === null) prefix = messageCreate.content.includes(config.prefix) ? config.prefix : `<@${config.botID}>`
	if(guildprefix) prefix = messageCreate.content.includes(guildprefix) ? guildprefix : `<@${config.botID}>`
    	if(messageCreate.content.indexOf(prefix) !==0) return
	const args = messageCreate.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	const cmd = bot.commands.get(command) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
	if(!cmd) return
		try{
			const commandDisable = await guildconfigdb.get(`disabledCommand_${messageCreate.guild.id}_${cmd.name}`)
			const categoryDisable = await guildconfigdb.get(`disabledCategory_${messageCreate.guild.id}_${cmd.category}`)
			if(cmd.category === "over18" && !messageCreate.channel.nsfw) return messageCreate.channel.send("Commands with the nsfw label can only work in nsfw channels!")
			if(commandDisable === null) await guildconfigdb.set(`disabledCommand_${messageCreate.guild.id}_${cmd.name}`, "enabled")
			if(categoryDisable === null) await guildconfigdb.set(`disabledCategory_${messageCreate.guild.id}_${cmd.category}`, "enabled")
			if(commandDisable === "disabled" ||categoryDisable === "disabled") return messageCreate.channel.send(reject.DisabledCommand)
			let maxargs = cmd.maxargs
			let minperms = cmd.minperms
			if(maxargs) for(let i = 0; i < maxargs; i  ++) if(args[i+1]) return messageCreate.channel.send(reject.user.args.toomany)
			if(minperms) for(let i = 0; i < minperms.length; i++) if(messageCreate.member.permissions.has(PermissionsBitField.Flags[minperms[i]])) return messageCreate.channel.send(`${reject.MissingPerms} \`${minperms[i]}\``)
				//This follows as what a moderator is defined as, someone with at lest either kick members or ban members this can change over time!
			if(args[0] === "-h") return messageCreate.channel.send(cmd.utilisation)
			cmd.execute(bot, messageCreate, args, prefix)
			const res1 = bot.structures.get("users")
			const res3 = bot.structures.get("ads")
			res1.execute(bot, messageCreate, args, prefix)
			res3.execute(bot, messageCreate, args, prefix)
			console.log(`${messageCreate.author.username} ran ${cmd.name} in ${messageCreate.guild.id}`)
		}catch(e){
			messageCreate.channel.send(reject.ExecutionError)
			return console.log(e)
	}
}
