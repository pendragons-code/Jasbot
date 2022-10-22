const { EmbedBuilder } = require("discord.js")
const nodeOS = require("os")
const os = require("os-utils")
const { version, author, site, git_repo } = require("../../../package.json")
const { defaultembedcolour } = require("../../../config.json")
const reject =require("../../../assets/items/rejection.json")
/*
You should really avoid using arch linuc for a server, I'm just using it because I ran out of drives and this arch computer is linked to another project
*/
module.exports = {
	name: "version",
	aliases: ["-v"],
	category: "core",
	desc: "Providing details of the bot's version and more!",
	utilisation: "version",
	async execute(bot, messageCreate, args, prefix){
		os.cpuUsage(function(v){
			try{
				const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
				arr.reverse()
				const used = process.memoryUsage().heapUsed / 1024 /1024
        			let memory = `Approximate memory usage: ${Math.round(used * 100) / 100} MB`
				const commander = bot.commands.filter(x => x.showHelp !== false)
				let desc = `Bot's Version: ${version}\nBot's Author: ${author}\nCPU Usage: ${Math.round(v * 100) / 100}%\n${memory}\nTotal Commands: ${commander.size}\nOperating System: Arch Linux - ${nodeOS.arch(), nodeOS.release()}`
				const embed = new EmbedBuilder()
				embed.setTitle("Requested Data")
				embed.setDescription(desc)
				embed.setFooter({ text: "Follow @Pendragonscode on instagram!" })
				embed.setTimestamp()
				embed.setColor(defaultembedcolour)
				embed.addFields(
					{ name: `Useful links!`, value: `[Github repo](${git_repo})\n[Bot's site](${site})`, inline: true }
				  )
				messageCreate.channel.send({ embeds: [embed] })
			}catch(e){
				console.log(e)
				return messageCreate.channel.send(reject.ExecutionError)
			}
		})
	}
}
