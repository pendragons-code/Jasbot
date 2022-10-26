const { getUserFromMention } = require("../../functions.js")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "insult",
	aliases: [],
	category: "utils",
	utilisation: "insult <@user>",
	desc: "Sends an insult from evilinsult.com's api!",
	async execute(bot, messageCreate, args, prefix){
		const fetch = await import("node-fetch")
		if(!args[0]) return messageCreate.channel.send(reject.user.mention.missing)
		let user = getUserFromMention(args[0])
		if(!user) return messageCreate.channel.send(reject.user.mention.invalid)
		if(args[1]) return messageCreate.channel.send(reject.user.mention.toomany)
		let output = await fetch.default("https://evilinsult.com/generate_insult.php?lang=en&type=json")
		let insult = await output.json().insult
		messageCreate.channe.send(`${user}, ${insult}`)
	}
}
