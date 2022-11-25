const { bot } = require("../bot.js")
const { decorpiece, decorpiece2 } = require("../config.json")
const fs = require("fs")
function extrafunctions(){
	console.log(`${decorpiece} Extrafunctions! ${decorpiece2}`)
	fs.readdirSync("./src/Extrafunctions").forEach(dirs => {
		const extrafunc = fs.readdirSync(`./src/Extrafunctions/${dirs}`).filter(file => file.endsWith(".js"))
		for(const file of extrafunc){
			require(`../src/Extrafunctions/${dirs}/${file}`)(bot)
			console.log(`Loading Task: ${file} from ${dirs} succeeded`)
		}
	})
	console.log(`${decorpiece} End of Automatic Tasks ${decorpiece2}`)
} 
module.exports = { extrafunctions }
