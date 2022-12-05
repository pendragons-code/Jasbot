const { db } = require("../../../Loaders/Jasbot.js")
const os = require("os-utils")
module.exports = async (Jasbot) => {

	//startup details
	os.cpuUsage(
		function (v) {
			const used = process.memoryUsage.rss() / 1024 / 1024
			let memory = `Approximate memory usage: ${Math.round(used * 100) / 100} MB`
			let Desc = `CPU Usage: ${Math.round(v * 100) / 100}%\n${memory}`
			console.log(`Status and uptime: 	\nLogged in as ${bot.user.username}	\n\n\n\nServers:	\nReady on ${bot.guilds.cache.size} servers!	\n\n\n\nUsers:	\nServing ${bot.users.cache.size} users!	\n\n\n\nHardware report!:	\n${Desc}`)
		}
	)


	//status
	let editmode = await db.get(`editmode`)
	setInterval(function () {
		if (editmode === null || editmode == 1) Jasbot.user.setActivity("Use 'jas help' for commands!")
		if (editmode == 0) Jasbot.user.setActivity("Editmode is on!")
	}, 3000)

	// Web server interaction
	Jasbot.webserver


	//Back up
	Jasbot.copyDB
	setInterval(
		function () {
			Jasbot.copyDB, 10800000
		}
	)

	// guild information
	console.log(Jasbot.guilds.cache.map(guilds => `[Name: ${guilds.name}, ID: ${guilds.id}]`))
}
