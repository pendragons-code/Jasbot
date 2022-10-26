const fs = require("fs")
const { bot } = require("../bot.js")
let decorpiece = "-=-=-=-=-=-="
let decorpiece2 = "=-=-=-=-=-=-"
function commander(){
	console.log(`${decorpiece} Commands! ${decorpiece2}`)
	fs.readdirSync("./src/commands").forEach(dirs => {
		const commands = fs.readdirSync(`./src/commands/${dirs}`).filter(files => files.endsWith(".js"))
		for(const file of commands){
			const command = require(`../src/commands/${dirs}/${file}`)
			console.log(`Loading command: ${file} from ${dirs} succeeded`)
			bot.commands.set(command.name.toLowerCase(), command)
		}
	})
	console.log(`${decorpiece} End of commands ${decorpiece2}`)
}
module.exports = { decorpiece: decorpiece, decorpiece2: decorpiece2, commander: commander }
