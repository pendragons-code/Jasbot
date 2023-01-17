module.exports = {
	name: "ping",
	aliases: [],
	category: "core",
	utilisation: "ping",
	desc: "Pong!",
	async execute(bot, messageCreate, args, mainPrefix) {
		return messageCreate.channel.send(`Ping: **${bot.ws.ping}**ms!`)
	}
}
