module.exports = {
	name: "help",
	aliases: [],
	category: "core",
	desc: "Sends list of commands on this bot!",
	utilisation: "",
	async execute(bot, messageCreate, args, mainPrefix){
		messageCreate.channel.send("Yes this should work!")
	}
}
