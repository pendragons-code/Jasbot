module.exports = (bot, error) =>{
	const { OwnerID } = require("../../config.json")
	bot.users.cache.get(OwnerID).send("```" + error + "```")
	// there is definitely a beter way to do this using backslashes but i am too fucking lazy
	// So assuming that this does work this should send a message when the bot crashes due to an error!
	console.log("\nERROR!!!\n")
	console.log(error)
}
