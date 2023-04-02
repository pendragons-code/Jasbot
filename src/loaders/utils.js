const { bot } = require("./bot.js")
const { Collection } = require("discord.js")
const { readdirSync } = require("fs")

async function loadUtils() {
	bot.utils = new Collection()
	console.log("Load Utils!")
	let loadUtilsDirs = await readdirSync("./src/utils").filter(dirs => dirs)
	for(dirs of loadUtilsDirs) {
		const utilFile = readdirSync(`./src/utils/${dirs}`).filter(file => file.endsWith(".js"))
		for(const file of utilFile) {
			const utility = require(`../utils/${dirs}/${file}`)
			console.log(`Loading util: ${file} from ${dirs}!`)
			bot.utils.set(utility.name.toLowerCase(), utility)
			delete require.cache[require.resolve(`../utils/${dirs}/${file}`)]
		}
	}
}
module.exports = { loadUtils }
