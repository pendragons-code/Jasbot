const fs = require("fs")
const { bot } = require("../bot.js")
const { decorpiece, decorpiece2 } = require("./Commands.js")
function eventer(){
	console.log(`${decorpiece} Events! ${decorpiece2}`)
	fs.readdirSync("./events").forEach(dirs => {
		const events = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'))
		for(const file of events){
			const event = require(`../events/${dirs}/${file}`)
			console.log(`Loading event: ${file} from ${dirs} succeeded!`)
			bot.on(file.split(".")[0], event.bind(null, bot))
		}
	})
	console.log(`${decorpiece} End of loading events! ${decorpiece2}`)
}
module.exports = { eventer }
