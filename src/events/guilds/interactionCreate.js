const { EmbedBuilder, InteractionType } = require("discord.js")
const { db } = require("../../loaders/bot.js")
const { Bot } = require("../../../config.json")
const PermissionList = require("../../../assets/responseComponents/permission.json")
const reject = require("../../../assets/responseComponents/rejection.json")
module.exports = async (bot, interactionCreate) => {
	// Token security cannot be implemented like the way it was, that said it should work if i read the options, im not working on this today because im busy
	if(interactionCreate.type == InteractionType.ApplicationCommand) {
		let editMode = await db.get("editMode")
		let NewUser = await db.get(`NewUser_${interactionCreate.user.id}`)
		let BlackListedUser = await db.get(`blacklisted_${interactionCreate.user.id}`)
		if(editMode == "on" && interactionCreate.user.id != Bot.BotOwnerID) return interactionCreate.reply({ content: reject.BotDownTime.editMode })
		if(BlackListedUser == "yes") return interactionCreate.reply({ content: reject.UserFault.privilege.BlackListedUser })
		const slashCmd = bot.slashCommands.get(interactionCreate.commandName)
		const errorEmbed = new EmbedBuilder()
		errorEmbed.setTitle("Error!")
		if(!slashCmd) return
		if(slashCmd.category == "over18" && !interactionCreate.channel.nsfw) return interactionCreate.channel.send({ content: "You can only run this command in an nsfw channel!" })
		if(slashCmd.minperms) {
			for(let i = 0; i < slashCmd.minperms.length; ++i) if(!inter.member.permissions.has(slashCmd.minperms[i])) {
				let PermissionQuery = PermissionList[slashCmd.minperms[i]]
				if(!Array.isArray(slashCmd.minperms[i])) {
					errorEmbed.setDescription(`${reject.UserFault.privilege.MissingPermissions} You are missing ${PermissionQuery}!`)
					return interactionCreate.reply({ embeds: [errorEmbed] })
				}
				for(let perArray = 0; perArray < slashCmd.minperms[i].length; ++perArray) {
					let PermissionQuery = ""
					let MissingPermissionName = PermissionList[slashCmd.minperms[i][perArray]]
					PermissionQuery + `\`${MissingPermissionName}\``
					if(slashCmd.minperms[i][perArray + 1]) PermissionQuery + ", "
					errorEmbed.setDescription(`${reject.UserFault.privilege.MissingPermissions} You are missing ${PermissionQuery}!`)
					return interactionCreate.reply({ embeds: [errorEmbed] })
				}
			}
		}
		try{
			const commandDisable = await db.get(`disabledCommand_${interactionCreate.guild.id}_${slashCmd.name}`)
			const categoryDisable = await db.get(`disabledCategory_${interactionCreate.guild.id}_${slashCmd.category}`)
			if(commandDisable == "disabled" || categoryDisable == "disabled") return interactionCreate.reply({ content: reject.UserFault.privilege.BlackListedUser })
			if(NewUser != "SentNewUserMessage") bot.utils.get("newuserslash").execute(bot, interactionCreate)
			slashCmd.execute(bot, interactionCreate)
			await db.add(`cmdsRan_${interactionCreate.user.id}`, 1)
			.catch((error) => {
				console.error(error)
				interactionCreate.reply({ content: reject.WeAreScrewed.ExecutionError })
			})
		}catch(error) {
			console.error(error)
			return interactionCreate.reply({ content: reject.WeAreScrewed.ExecutionError })
		}
	}
	if(interactionCreate.type === InteractionType.MessageComponent) {
		let ButtonID = await JSON.parse(interactionCreate.customId)
		let ButtonFile = await ButtonID.ffb
		if(!ButtonFile) return
		delete require.cache[require.resolve(`../../buttons/${ButtonFile}.js`)];
		const button = require(`../../buttons/${ButtonFile}.js`)
		if(button) return button({ bot, interactionCreate, ButtonID });
	}
}
