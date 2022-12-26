const { bot } = require("./bot.js")
const { readdirSync } = require("fs")
function loadHelper() {
	console.log(`Loading helpers!`)
	readdirSync("./src/helpers").forEach(dirs => {
		const helper = readdirSync(`./src/helpers/${dirs}`).filter(file => file.endsWith(".js"))
		for(const file of helper) {
			require(`../helpers/${dirs}/${file}`)(bot)
			console.log(`Loading Helper: ${file} from ${dirs} succeeded!`)
		}
	})
}
module.exports = { loadHelper }
