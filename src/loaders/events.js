const { readdirSync } = require("fs")
const { bot } = require("./bot.js")
async function loadEvents() {
	console.log("Events:")
	const loadEventsDirs = await readdirSync("./src/events").filter(dirs => dirs)
	for(dirs of loadEventsDirs) {
		const eventFile = readdirSync(`./src/events/${dirs}`).filter(file => file.endsWith(".js"))
		for(const file of eventFile) {
			//named this event since this actually requires the file, while the other is a searching operation.
			const event = require(`../events/${dirs}/${file}`)
			console.log(`Loading event: ${file} from ${dirs}!`)
			bot.on(file.split(".")[0], event.bind(null, bot))
			delete require.cache[require.resolve(`../events/${dirs}/${file}`)]
		}
	}
}
module.exports = { loadEvents }
