const fs = require("fs")
const { decorpiece, decorpiece2 } = require("../config.json")
const { bot } = require("../bot.js")
function messagehelper(){
	console.log(`${decorpiece} messagehelper ${decorpiece2}`)
	fs.readdirSync("./src/helper").forEach(dirs =>{
		for(const file of helpers){
			const helper = require(`../src/helper/${dirs}/${file}`)
			console.log(`Loading helper: ${file} from ${dirs}`)
			bot.messagehelper.set(helper.name.toLowerCase(), helper)
			.catch((error) =>{
				console.error(error)
				console.log(`Could not load helper ${helper.name.toLowerCase()}`)
			})
		}
	})
	console.log(`${decorpiece} End of helpers ${decorpiece2}`)
}
module.exports = { messagehelper }
