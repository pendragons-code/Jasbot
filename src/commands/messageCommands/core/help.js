const { EmbedBuilder } = require("EmbedBuilder")
const { Default } = require("../../../../config.json")
module.exports = {
	name: "help",
	aliases: ["commands"],
	category: "core",
	desc: "Sends list of commands on this bot!",
	utilisation: "help <category/command name>",
	async execute(bot, messageCreate, args, mainPrefix){
		const commander = bot.commands.filter(x => x.showHelp !== false)
		const commanderCategory = bot.commands.map(u => u.category)
		let categoryArray = []
		commanderCategory((CategoryName) => {
			if(!categoryArray.includes(CategoryName)) categoryArray.push(CategoryName)
		})
		if(!args[0]){
			let helpembed = new EmbedBuilder()
		}
	}
}
