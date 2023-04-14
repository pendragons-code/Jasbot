const { db } = require("../../loaders/bot.js")
const { Default, Bot } = require("../../../config.json")
const env = require("dotenv").config()
const reject = require("../../../assets/responseComponents/rejection.json")
const PermissionList = require("../../../assets/responseComponents/permission.json")
module.exports = async (bot, messageCreate) => {
	let editMode = await db.get("editMode")
	let dbPrefix = await db.get(`prefix_${messageCreate.guild.id}`)
	let NewUser = await db.get(`NewUser_${messageCreate.author.id}`)
	let BlackListedUser = await db.get(`blacklisted_${messageCreate.author.id}`)
	if(messageCreate.content.includes(process.env.token)) bot.utils.get("tokenSecurity").execute(bot, messageCreate, args)
	//antiswear code here
	// I don't have to do this since I can just put that code here, but I put it like that because i find it easier editing the utils file and not having to make messageCreate.js long and messy
	if(dbPrefix === null) dbPrefix = Default.DefaultPrefix
	let prefix = messageCreate.content.includes(dbPrefix) ? dbPrefix : `<@${Bot.BotID}>`
	if(messageCreate.author.bot || messageCreate.channel.type == "dm" || messageCreate.content.indexOf(prefix) !== 0) return
	if(BlackListedUser == "yes") return messageCreate.channel.send(reject.privilege.BlackListedUser)
	if(editMode == "on" && messageCreate.author.id === Bot.BotOwnerID) return messageCreate.channel.send(reject.BotDownTime.editMode)
	const args = messageCreate.content.slice(prefix.length).trim().split(/ +/g)
	const command = args.shift().toLowerCase()
	const cmd = bot.messageCommands.get(command) || bot.messageCommands.find(cmd => cmd.aliases && cmd.aliases.includes(command))
	if(!cmd) return
	try{
		// As you can see i defined the db items for disable commands and category because cmd is only defined here
		const commandDisable = await db.get(`disabledCommand_${messageCreate.guild.id}_${cmd.name}`)
		const categoryDisable = await db.get(`disabledCategory_${messageCreate.guild.id}_${cmd.category}`)
		if(cmd.category === "over18" && !messageCreate.channel.nsfw) return messageCreate.channel.send("This command can only work in an nsfw channel!")
		if(commandDisable === "disabled" || categoryDisable === "disabled") return messageCreate.channel.send(reject.UserFault.privilege.DisabledCommand)
		if(cmd.maxArgs) if(args[cmd.maxArgs + 1]) return messageCreate.channel.send(reject.UserFault.args.tooMany)
		if(cmd.minPerms) for(let i = 0; i < cmd.minPerms.length; ++i) if(!messageCreate.member.permissions.has(cmd.minPerms[i])) {
			let MissingPermissionName = PermissionList[cmd.minPerms[i]]
			if(Array.isArray(cmd.minPerms[i])) {
				// That one weird workaround (push in missing permissions that are missing in a string and send it)
				let MissingPermissionName = ""
				for(let perArray = 0; perArray < cmd.minPerms[i].length; ++perArray) {
					let MissingPermissionNameFromAndLogic = PermissionList[cmd.minPerms[i][perArray]]
					MissingPermissionName + `\`${MissingPermissionNameFromAndLogic}\``
					if(cmd.minPerms[i][perArray + 1]) MissingPermissionName + ", "
				}
			}
			return messageCreate.channel.send(`${reject.UserFault.privilege.MissingPermissions} ${MissingPermissionName}`)
		}
		// get
		// Why did i not just create an array and check if it included the command?
		// I did this because not only do I now have to wait for the DB, but I also now have to parse the array.
		// This becomes worse if the array is a fat one!
		// This already can give you an idea of the reduction of speed.
		if(args[0] === "-h") return messageCreate.channel.send(cmd.utilisation)
		// I forgot i .toLowerCase() everything in the collection.
		if(NewUser !== "SentNewUserMessage") bot.utils.get("newuser").execute(bot, messageCreate, args);
		if(cmd.category === "creator" && messageCreate.author.id !== Bot.BotOwnerID) return messageCreate.channel.send(reject.UserFault.privilege.CreatorOnly)
		cmd.execute(bot, messageCreate, args, prefix)
		await db.add(`cmdsRan_${messageCreate.author.id}`, 1)
		.catch((error) => {
			console.error(error)
			return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
		})
		//advertisment
	} catch(error) {
		console.error(error)
		return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
	}
}
