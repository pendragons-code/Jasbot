module.exports = {
	name: "",
	aliases: [],
	category: "",
	utilisation: "",
	desc: "",
	async execute(bot, messageCreate, args){
		messageCreate.channel.send(`Ping: **${bot.ws.ping}**ms!`)
	}
}
