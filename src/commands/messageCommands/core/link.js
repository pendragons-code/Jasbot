module.exports = {
	name: "link",
	aliases: [],
	category: "core",
	utilisation: "link <dm/here>",
	desc: "Sends links to add the discord bot! Not specifying where the link should be sent would mean the bot will send the message in the current channel!",
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0] || args[0] === "here") return messageCreate.channel.send("https://jasbot.pendragonscode.xyz")
		if(args[0] == "dm") return messageCreate.author.send("https://jasbot.pendragonscode.xyz").catch((error) => {
			console.error(error)
			messageCreate.channel.send("https://jasbot.pendragonscode.xyz")
			return messageCreate.channel.send("We could not send it to your dms!")
		})
	}
}
