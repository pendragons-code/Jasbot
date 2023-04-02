const { bot } = require("./bot.js")
const { Collection } = require("discord.js")
const { readdirSync } = require("fs")

async function loadMessageCommands() {
	bot.messageCommands = new Collection()
	console.log(`Loading messageCommands`)
	let loadMessageCommandDirs = await readdirSync("./src/commands/messageCommands").filter(dirs => dirs)
	for(const dirs of loadMessageCommandDirs) {
		const commandFile = readdirSync(`./src/commands/messageCommands/${dirs}`).filter(file => file.endsWith(".js"))
		for(const file of commandFile) {
			const command = require(`../commands/messageCommands/${dirs}/${file}`)
			console.log(`Loading messageCommand: ${file} from ${dirs}!`)
			bot.messageCommands.set(command.name.toLowerCase(), command)
			delete require.cache[require.resolve(`../commands/messageCommands/${dirs}/${file}`)]
		}
	}
}
module.exports = { loadMessageCommands }
