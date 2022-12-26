const { bot } = require("./bot.js")
const { Collection } = require("discord.js")
const { readdirSync } = require("fs")

function loadUtils() {
	bot.utils = new Collection()
	console.log("Load Utils!")
	readdirSync("./src/utils").forEach(dirs => {
		const utilFile = readdirSync(`./src/utils/${dirs}`).filter(file => file.endsWith(".js"))
		for(const file of utilFile) {
			const utility = require(`../utils/${dirs}/${file}`)
			console.log(`Loading util: ${file} from ${dirs}!`)
			bot.utils.set(utility.name.toLowerCase(), utility)
		}
	})
}
module.exports = { loadUtils }
