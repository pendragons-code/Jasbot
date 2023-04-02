const { readdirSync } = require("fs")
const { Collection } = require("discord.js")
const { bot } = require("./bot.js")

async function loadSlashCommands() {
	bot.slashCommands = new Collection()
	CommandsArray = [];
	let loadSlashCommandsDirs = await readdirSync("./src/commands/slashCommands").filter(dirs => dirs)
	for(const dirs of loadSlashCommandsDirs) {
		const slashCommandsFile = readdirSync(`./src/commands/slashCommands/${dirs}`).filter(file => file.endsWith(".js"))
		for(const file of slashCommandsFile) {
			const slashCommand = require(`../commands/slashCommands/${dirs}/${file}`)
			bot.slashCommands.set(slashCommand.name.toLowerCase(), slashCommand)
			console.log(`Loaded slashCommand: ${file} from ${dirs}!`)
			CommandsArray.push(slashCommand)
			delete require.cache[require.resolve(`../commands/slashCommands/${dirs}/${file}`)]
		}
	}
	bot.on("ready", (bot) => {
		bot.application.commands.set(CommandsArray)
	})
}
module.exports = { loadSlashCommands }
