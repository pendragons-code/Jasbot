module.exports = async (bot) => {
	const { botconfigdb } = require("../../bot.js")
	const os = require("os-utils")
	let editmode = await botconfigdb.get("editmode")
	os.cpuUsage(function(v){
		const used = process.memoryUsage.rss()/ 1024 /1024
        let memory = `Approximate memory usage: ${Math.round(used * 100) / 100} MB`
		let Desc = `CPU Usage: ${Math.round(v * 100) / 100}%\n${memory}`
		console.log(`Status and uptime: 	\nLogged in as ${bot.user.username}	\n\n\n\nServers:	\nReady on ${bot.guilds.cache.size} servers!	\n\n\n\nUsers:	\nServing ${bot.users.cache.size} users!	\n\n\n\nHardware report!:	\n${Desc}`)
		setInterval(function(){ 
			if(editmode === null || editmode == 1) bot.user.setActivity("Use 'jas help' for commands!")
			if(editmode == 0) bot.user.setActivity("Editmode is on!")
		}, 3000)
		})
	bot.server
}