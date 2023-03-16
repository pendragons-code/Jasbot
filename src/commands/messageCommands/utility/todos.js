const { db } = require("../../../loaders/bot.js")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "todo",
	aliases: [],
	category: "utility",
	desc: "A command that helps you manage your ToDo list.",
	utilisation: "todo add <task>\n todo remove <task number>\ntodo set <task number> <task>\ntodo reset all\n todo show <all/ task number>",
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[1]) return messageCreate.channel.send(reject.UserFault.args.missing)
		let ToDoEmbed = new EmbedBuilder()
		const currentSetOfTODOs = await db.get(`todos_${messageCreate.author.id}`)
		let numberOfTodos = 0
		if(currentSetOfTODOs !== null) numberOfTodos = currentSetOfTODOs.length
		switch(args[0]) {
			case "show":
				if(args[1] === "all") return messageCreate.channel.send(`${currentSetOfTODOs}`)
				messageCreate.channel.send(currentSetOfTODOs.at(args[1] - 1))
				break;

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
					ToDoEmbed.setColor(Default.DefaultEmbedColor)
					ToDoEmbed.setFooter({ text: Default.DefaultFooterText })
					ToDoEmbed.setTimestamp()
					ToDoEmbed.setURL(Bot.BotSite)
					messageCreate.channel.send({ embeds: [ToDoEmbed] })
				})
				break;

			case "remove":
				if(isNaN(args[1])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
				if(numberOfTodos === null || numberOfTodos < 1) return messageCreate.channel.send("You do not have any ToDos!")
				let number = parseInt(args[1]) // We cannot have a todo 5.4 (I am trying to avoid floats)
				if(numberOfTodos < number) return messageCreate.channel.send(reject.UserFault.numbers.notInRange)
				await db.pull(`todos_${messageCreate.author.id}`, currentSetOfTODOs[number - 1])
				.catch(() => {
					console.error(error)
					console.log(messageCreate.content)
					return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
				})
				.then(() => {
					return messageCreate.channel.send(`ToDo ${number} removed!`)
				})
				break;

			case "set":
				currentSetOfTODOs.splice(0, 1, "test go through")
				await db.set(`todos_${messageCreate.author.id}`, currentSetOfTODOs)
				break;

			default:
				return messageCreate.channel.send(reject.UserFault.args.invalid)
		}
	}
}
