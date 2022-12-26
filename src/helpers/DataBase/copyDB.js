const { copy } = require("fs-extra")
module.exports = async (bot) => {
	let CurrentTime = Date.now()
	let dateObj = new Date(CurrentTime)
	copy("./DataBase", `./backups/${dateObj.getDate()}-${dateObj.getMonth()}-${dateObj.getFullYear()}-${dateObj.getHours()}-${dateObj.getMinutes()}`, function(err) {
		if(err) return console.error("Error, FAILURE TO BACK UP DB!", err)
		console.log("Copied data!")
	})
}
