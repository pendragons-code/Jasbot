const { getUserFromMention } = require("../../../functions/mentions/users.js")
const reject = require("")
const axios = require("axios")
module.exports = {
	name: "insult",
	aliases: [],
	category: "utility",
	utilisation: "insult <@user>",
	desc: "Sends and insult from evilinsult.com.",
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.mentions.missing)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.mentions.tooMany)
		let user = getUserFromMention(args[0])
		if(!user) return messageCreate.channel.send(reject.UserFault.mentions.invalid)
		axios({
			method: "get",
			url: "https://evilinsult.com/generate_insult.php?lang=en&type=json",
			headers: {
			"Content-Type": "application/json"
			}
		}) .then((result) => {
			messageCreate.channel.send(`Hey ${user}, ${result.data.insult}`)
		})
	}
}
