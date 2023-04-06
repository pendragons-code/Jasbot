const { cpuUsage } = require("os-utils")
const { db } = require("../../loaders/bot.js")
module.exports = async (bot) => {
	let editmode = await db.get("editmode")
	cpuUsage(function(cpuUsageDetails) {
		const rawMemoryUsage = process.memoryUsage.rss()/ 1024 /1024
		const estimatedMemoryUsage = Math.round(rawMemoryUsage * 100) / 100
		console.log(`Status and uptime:\nLogged in as ${bot.user.tag}\n\nReady on ${bot.guilds.cache.size} servers and helping about ${bot.users.cache.size} users!\n\nHardware report: ${estimatedMemoryUsage} MB and ${Math.round(cpuUsageDetails * 100) / 100}% cpu`)
	})
	setInterval(function() {
		if(editmode === "on") bot.user.setActivty("Editmode is on!")
		bot.user.setActivity("Use 'jas help' for commands!")
	}, 3000)
	bot.webPage
	//bot.copyDB
	setInterval(function() {
		bot.copyDB, 10800000
	})
	console.log(bot.guilds.cache.map(guild => guild.name))
	console.log(bot.guilds.cache.map(guild => guild.id))
}
