const { EmbedBuilder } = require("discord.js")
const os = require("os-utils")
const config = require("../../../config.json")
module.exports = {
	name: "usage",
	aliases: ["-u"],
	category: "core",
	utilisation: "usage",
	desc: "Sends You details of the bot usage so far.",
	async execute(bot, messageCreate, args, prefix){
		os.cpuUsage(function(v){
			const arr = [1, 2, 3, 4, 5, 6 ,7 ,8 ,9, 10]
			arr.reverse()
			const used = process.memoryUsage().heapUsed / 1024 /1024
			let memory = `Approximate memory usage: ${Math.round(used * 100) / 100} MB`
			let CPU = `CPU Usage: ${Math.round(v * 100) / 100}%`
			const embed = new EmbedBuilder()
			embed.setColor(config.defaultembedcolour)
			embed.setTitle("Jasbot's Usage")
			embed.setFooter({ text: config.defaultfootertext })
			embed.setTimestamp()
			embed.setDescription(`${CPU}\n${memory}`)
		})
	}
}
