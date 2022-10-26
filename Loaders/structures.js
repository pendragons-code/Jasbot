const { bot } = require("../bot.js")
const { decorpiece, decorpiece2 } = require("./Commands.js")
const fs = require("fs")
function structurer(){
	console.log(`${decorpiece} Stuctural components ${decorpiece2}`)
	fs.readdirSync("./src/structure").forEach(dirs => {
		const structure = fs.readdirSync(`./src/structure/${dirs}`).filter(files => files.endsWith(".js"))
		for(const file of structure){
			const structure = require(`../src/structure/${dirs}/${file}`)
			console.log(`Loading structure component: ${file} from ${dirs}`)
			bot.structure.set(structure.name.toLowerCase(), structure)
		}
	})
	console.log(`${decorpiece} End of Stuctural components ${decorpiece2}`)
}
module.exports = { structurer: structurer }
