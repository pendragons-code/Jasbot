const { db } = require("../../../Loaders/Jasbot.js")
const { prefix, botID } = require("../../../config.json")
const PermList = require("../../../assets/items/permission.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = async (Jasbot, messageCreate) => {
	let editmode = await db.get(`editmode`)
	let blacklisted = await db.get(`blacklisted_${messageCreate.author.id}`)
	if(blacklisted == "yes") return messageCreate.channel.send(reject.BlacklistedUser)
	Jasbot.AddOns.get("TokenDetector").execute(Jasbot, messageCreate, args)
	if(messageCreate.author.bot || messageCreate.channel.type == "dm") return
	let antiswear = await db.get(`cuss_${messageCreate.guild.id}`)
	if(antiswear === "on") Jasbot.AddOns.get("AntiSwear").execute(Jasbot, messageCreate, args)
	let guildprefix = await db.get(`prefix_${messageCreate.guild.id}`)
	let mainprefix = ''
	if(guildprefix == null) mainprefix = messageCreate.content.includes(prefix) ? prefix : `<@${botID}>`
	if(messageCreate.content.indexOf(mainprefix) !== 0) return
	if(editmode == 0 && messageCreate.author.id != config.OwnerID) return messageCreate.channel.send("This bot is in editmode! Please try again later! This feature is put in place in order to ensure that the bot does not break anything. This bot will, however, still keep Anti-Swear on!")
	const args = messageCreate.content.slice(prefix.length).trim().split(/ +/g)
	const command = args.shift().toLowerCase()
	const cmd = Jasbot.commands.get(command) || Jasbot.commands.find(cmd => cmd.aliases && md.aliases.includes(command))
	if(cmd) return
	const CommandDisable = await db.get(`DisabledCommand_${messageCreate.guild.id}_${cmd.name}`)
	const CategoryDisable = await db.get(`DisabledCategory_${messageCreate.guild.id}_${cmd.category}`)
	if(CommandDisable == "disabled" || CategoryDisable == "disabled") return messageCreate.channel.send(reject.DisabledCommand)
	try{
		if(cmd.maxargs){
			for(let i = 0; i < cmd.maxargs; i++) if(args[i+1]) return messageCreate.channel.send(reject.user.args.toomany)
		}
		//Maximum arguments, yes i should be using camelcase, but i like it like this
		if(cmd.minperms){
			// I wrote this part, knowing that I will hate myself for it, but screw it am I right? I see most people do something similar but no one really works on the && side.
			// that said, i will very likely change this in the future
			// Basically, && logic with permissions uses arrays in an array and || logic just use ',' in the first array
			
			// || logic like this:
			// minperms: ['PermissionsBitField.Flags.KickMembers', 'PermissionsBitField.Flags.BanMembers']
			
			// && logic looks like this
			// minperms: [['PermissionsBitField.Flags.KickMembers', 'PermissionsBitField.Flags.BanMembers']]
			
			// ChangeNickname || KickMembers && BanMembers
			// minperms: [`PermissionsBitField.Flags.ChangeNickname`, ['PermissionsBitField.Flags.KickMembers', 'PermissionsBitField.Flags.BanMembers']]
			for(let i = 0; i < cmd.minperms.length; i++){
				if(!messageCreate.member.permissions.has(cmd.minperms[i])){
					let PermQuery = PermList[cmd.minperms[i]]
					if(Array.isArray(cmd.minperms[i])){
						let PermQuery = ""
						//Have to define it as such before we add things in there
						for(let PerItemInArray = 0; PerItemInArray < cmd.minperms[i].length; PerItemInArray++){
							let RequiredPermissionFromArray = PermList[cmd.minperms[i][perarray]]
							PermQuery + `\`${RequiredPermissionFromArray}\``
							if(cmd.minperms[i][PerItemInArray + 1]) PermQuery + ", "
						}
					}
				return messageCreate.channel.send(`${reject.MissingPerms} \`${PermQuery}\``)
				}
			}
		}
		//Minimum permissions, but im too lazy to specify it with camelcase :(
		//I should prolly just use the mass replace tool in the IDE to replace it but, whatevs!
		
		if(args[0] === "-h") return messageCreate.channel.send(cmd.utilisation)
		cmd.execute(Jasbot, messageCreate, args, mainprefix)
		Jasbot.AddOns.get("newuser").execute(Jasbot, messageCreate, args)
		Jasbot.AddOns.get("ads").execute(Jasbot, messageCreate, args)
		console.log(`${messageCreate.author.username} ran ${cmd.name} in ${messageCreate.guild.id}`)
	}catch(e){
		Jasbot.users.cache.get(OwnerID).send(`\`${e}\n\n\n${messageCreate.content}\``)
		console.error(`Trigger`, messageCreate.content)
		console.error(`Error`, e)
		return messageCreate.channel.send(reject.ExecutionError)
	}
}
