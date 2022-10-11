module.exports = {
	name: "link",
	aliases: [],
	category: "core",
	utilisation: "link <dm/here>",
	description: "Sends link to add the discord bot! Not specifying where the link should be sent would mean the bot will send the message in the current channel!",
	async execute(bot, messageCreate, args, prefix){
		if(!args[0]) return messageCreate.channel.send("https://jasbot.senghong.xyz")
		if(args[0] == "dm") return messageCreate.author.send("https://jasbot.senghong.xyz").catch(()=> {
			messageCreate.channel.send("We could not reach your DMs!")
			return messageCreate.channel.send("https://jasbot.senghong.xyz")
		})
		if(args[1] == "here") return messageCreate.channel.send("https://jasbot.senghong.xyz")
	}
}
