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
		ToDoEmbed.setFooter({ text: Default.DefaultFooterText })
		ToDoEmbed.setColor(Default.DefaultEmbedColor)
		ToDoEmbed.setTimestamp()
		ToDoEmbed.setURL(Bot.BotSite)
		switch(args[0]) {
			case "show": // code works, we just need to implement embed now
				if(numberOfTodos === null || numberOfTodos < 1) return messageCreate.channel.send("You do not have any ToDos!")
				if(args[1] === "all"){
					let resultForToDoShowAllDescription = ""
					for(let i = 0; i < currentSetOfTODOs.length; ++i) resultForToDoShowAllDescription += `[${i+1}] ${currentSetOfTODOs[i]}\n`
					ToDoEmbed.setTitle(`Showing all current tasks!`)
					ToDoEmbed.setDescription("```" + resultForToDoShowAllDescription + "```") // too lazy to add regex, my brain rabak siol
					return messageCreate.channel.send({ embeds: [ToDoEmbed] })
				}
				if(isNaN(args[1]) && args[1] !== "all") return messageCreate.channel.send(reject.UserFault.args.invalid)
				if(parseInt(args[1]) < 1 || currentSetOfTODOs.length < parseInt(args[1] - 1)) return messageCreate.channel.send(reject.UserFault.numbers.notInRange)
				ToDoEmbed.setTitle(`Showing task ${parseInt(args[1])}`)
				ToDoEmbed.setDescription("```" + `[${parseInt(args[1])}] ` + currentSetOfTODOs[`${args[1] - 1}`] + "```")
				messageCreate.channel.send({ embeds: [ToDoEmbed] })
				break;

			case "add":
				if(!args[2]) return messageCreate.cahnnel.send(reject.UserFault.args.missing)
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

			case "remove":
				if(isNaN(args[1])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
				if(numberOfTodos === null || numberOfTodos < 1) return messageCreate.channel.send("You do not have any ToDos!")
				let number = parseInt(args[1]) // We cannot have a todo 5.4 (I am trying to avoid floats)
				if(numberOfTodos < number || number < 1) return messageCreate.channel.send(reject.UserFault.numbers.notInRange)
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
				if(!args[2]) return messageCreate.channel.send(reject.UserFault.args.missing)
				if(numberOfTodos === null || numberOfTodos < 1) return messageCreate.channel.send("You do not have any ToDos!")
				if(isNaN(args[1])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
				if((parseInt(args[1])-1) > currentSetOfTODOs.length || parseInt(args[1]) < 1) return messageCreate.channel.send(reject.UserFault.numbers.notInRange)
				await currentSetOfTODOs.splice(parseInt(args[1]-1), 1, args.slice(2).join(" ")) // todo args[0](set) args[1](task number to change) args[2 ++](task here)
				await db.set(`todos_${messageCreate.author.id}`, currentSetOfTODOs)
				ToDoEmbed.setTitle(`Updating task ${parseInt(args[1])}!`)
				let updatedSetOfTODOs = await db.get(`todos_${messageCreate.author.id}`) // I did this so we fetch directly from the db, not what we expect the set value to be
				ToDoEmbed.setDescription("```Changed " + parseInt(args[1]) + " to " + updatedSetOfTODOs[`${parseInt(args[1])-1}`] + "```")
				messageCreate.channel.send({ embeds: [ToDoEmbed] })
				break;

			default:
				return messageCreate.channel.send(reject.UserFault.args.invalid)
		}
	}
}

// Things to implement (character limit checker(2000), task limit (30), check if set is redundant)
