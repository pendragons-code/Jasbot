const { userdb } = require("../../../bot.js")
const { EmbedBuilder } = require("discord.js")
const { getUserFromMention} = require("../../functions.js")
const { OwnerID, defaultfootertext, defaultembedcolour } = require("../../../config.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "blacklist",
	aliases:[],
	category: "creator",
	utilisation: "blacklist <@user> <on/off/check>",
	desc: "Blacklists user from bot.",
	async execute(bot, messageCreate, args, prefix){
		if(messageCreate.author.id != OwnerID) return messageCreate.channel.send(reject.CreatorOnly)
		if(!args[0] || !args[1]) return messageCreate.channel.send(reject.user.args.missing)
		let user = getUserFromMention(args[0])
		if(!user) return messageCreate.channel.send(reject.user.mentions.missing)
		if(user.id === OwnerID) return messageCreate.channel.send("You cannot blacklist yourslf.")
		let details = await userdb.get(`blacklisted_${user.id}`)
		if(details === null) details = "no"
		let action = args[1]
		const embed = new EmbedBuilder()
		switch(action){
			case "check":
				embed.setTitle(`${user}'s blacklist details!`)
				embed.setDescription(`Blacklist Status: ${details}`)
				embed.setFooter({ text: defaultfootertext })
				embed.setColor(defaultembedcolour)
				embed.setTimestamp()
				messageCreate.channel.send({ embeds: [embed] })
				break

			case "on":
				if(details === "yes") return messageCreate.channel.send("This user is already blacklisted!")
				embed.setTimestamp()
				embed.setColor(defaultembedcolour)
				embed.setFooter({ text: defaultfootertext })
				embed.setTitle(`Blacklisting ${user}!`)
				embed.setDescription(`${user} has been blacklisted!`)
				await userdb.set(`blacklisted_${user.id}`, "yes").catch((error) =>{
					console.error(error)
					console.log(messageCreate.content)
					return messageCreate.channel.send("Userdb could not update the blacklist status!")
				})
				messageCreate.channel.send({ embeds: [embed] })
				break

			case "off":
				if(details === "off") return messageCreate.channel.send("This user is not already blacklisted!")
				embed.setTimestamp()
				embed.setColor(defaultembedcolour)
				embed.setFooter({ text: defaultfootertext })
				embed.setTitle(`Blacklisting ${user}!`)
				embed.setDescription(`${user} has been removed from blacklist!`)
				await userdb.set(`blacklisted_${user.id}`, "no").catch(() =>{
					console.error(error)
					console.log(messageCreate.content)
					return messageCreate.channel.send("Userdb could not update the blacklist status!")
				})
				messageCreate.channel.send({ embeds: [embed] })
				break
		}
	}
}
