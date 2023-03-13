const { db } = require("../../../loaders/bot.js")
const { EmbedBuilder } = require("discord.js")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "todo",
	aliases: [],
	category: "utility",
	desc: "A command that helps you manage your ToDo list.",
	utilisation: "todo add <task>\n todo remove <task number>\ntodo set <task number> <task>\ntodo reset all",
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[1]) return messageCreate.channel.send(reject.UserFault.args.missing)
		let ToDoEmbed = new EmbedBuilder()
		const currentSetOfTODOs = await db.get(`todos_${messageCreate.author.id}`)
		let numberOfTodos = 0
		if(currentSetOfTODOs !== null) numberOfTodos = currentSetOfTODOs.length
		switch(args[0]) {
			case "add":
				await db.push(`todos_${messageCreate.author.id}`, args.slice(1).join(" "))  // Not gonna limit the number of characters because the discord's in-built limit seems good enough to me
				.catch((error) => {
					console.error(error)
					console.log(messageCreate.content)
					return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
				})
				.then(() => {
					ToDoEmbed.setTitle(`Added task ${numberOfTodos + 1}`)
					ToDoEmbed.setDescription("```" + `[${numberOfTodos + 1}] ${args.slice(1).join(" ")}` + "```")
					messageCreate.channel.send({ embeds: [ToDoEmbed] })
				})
				break;
		}
	}
}
