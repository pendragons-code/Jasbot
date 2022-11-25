module.exports = async (bot) => {
	let dateobj = new Date(Date.now())
	const source = "./DataBase"
	const destination = `./backups/${dateobj.getDate()}-${dateobj.getMonth}-${dateobj.getFullYear()}-${dateobj.getHours()}-${dateobj.getMinutes()}-${dateobj.getSeconds()}`
	const fs = require("fs-extra")
	fs.copy(source, destination, function(err){
		if(err){
			console.log("Failed to create backup!")
			return console.log("Error:", err)
		}
		console.log(`Copied DataBase  to ${destination}`)
	})
}
