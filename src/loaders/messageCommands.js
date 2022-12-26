const { bot } = require("./bot.js")
const { Collection } = require("discord.js")
const { readdirSync } = require("fs")

function loadMessageCommands() {
	bot.messageCommands = new Collection()
	console.log(`Loading messageCommands`)
	readdirSync("./src/commands/messageCommands").forEach(dirs => {
		const commandFile = readdirSync(`./src/commands/messageCommands/${dirs}`).filter(file => file.endsWith(".js"))
		for(const file of commandFile) {
			const command = require(`../commands/messageCommands/${dirs}/${file}`)
			console.log(`Loading messageCommand: ${file} from ${dirs}!`)
			bot.messageCommands.set(command.name.toLowerCase(), command)
		}
	})
}
module.exports = { loadMessageCommands }
