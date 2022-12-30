module.exports = async (bot) =>{
	let TS = Date.now()
	let dateobj = new Date(TS)
	const source = "./DataBase"
	const destination = `./backups/${dateobj.getDate()}-${dateobj.getMonth()}-${dateobj.getFullYear()}-${dateobj.getHours()}-${dateobj.getMinutes()}`
	const fs = require("fs-extra")
	fs.copy(source, destination, function (err){
		if(err){
			console.log("Failed to copy Backup!" + destination)
			return console.error(err)
		}
		console.log(`Copied Data base: ${destination}`)
	})
}
