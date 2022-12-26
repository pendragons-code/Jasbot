const { readdirSync } = require("fs")
const { bot } = require("./bot.js")
function loadEvents() {
	console.log("Events:")
	readdirSync("./src/events").forEach(dirs => {
		const eventFile = readdirSync(`./src/events/${dirs}`).filter(file => file.endsWith(".js"))
		for(const file of eventFile) {
			//named this event since this actually requires the file, while the other is a searching operation.
			const event = require(`../events/${dirs}/${file}`)
			console.log(`Loading event: ${file} from ${dirs}!`)
			bot.on(file.split(".")[0], event.bind(null, bot))
		}
	})
}
module.exports = { loadEvents }
