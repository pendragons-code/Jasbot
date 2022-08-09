module.exports = async (bot) => {
	const { db } = require("../../bot.js")
	const os = require("os-utils")
	let editmode = await db.get("editmode")
	os.cpuUsage(function(v){
		const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		arr.reverse()
		const used = process.memoryUsage().heapUsed / 1024 /1024
        let memory = `Approximate memory usage: ${Math.round(used * 100) / 100} MB`
		let Desc = `CPU Usage: ${Math.round(v * 100) / 100}%\n${memory}`
		console.log(`
Status and uptime: 
Logged in as ${bot.user.username}


Servers:
Ready on ${bot.guilds.cache.size} servers!
		

Users:
Serving ${bot.users.cache.size} users!
		

Hardware report!:
${Desc}
		`)
		setInterval(function(){ 
			if(editmode === null || editmode == 1) bot.user.setActivity("Use 'jas help' for commands!")
			if(editmode == 0) bot.user.setActivity("Editmode is on!")
		}, 3000)

		})
}
