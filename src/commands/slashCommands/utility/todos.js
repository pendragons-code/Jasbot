const { db } = require("../../../loaders/bot.js")
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "todos",
	categroy: "utility",
	description: "A command that help you manage your ToDo list.",
	utilisation: "todo add <task>\ntodo remove <task number>\ntodo set <task number> <task>\ntodo reset all\ntodo show <all/task number>",
	options: [
		{
			name: "action",
			description: "<add, remove, set, reset, show>",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{ name: "add", value: "add" },
				{ name: "remove", value: "remove" },
				{ name: "set", value: "set" },
				{ name: "reset", value: "reset" },
				{ name: "show", value: "show" }
			]
		},
		{
			name: "task",
			description: "A task to manipulate.",
			type: ApplicationCommandOptionType.String,
			required: false
		},
		{
			name: "task-number",
			description: "Task number to manipulate.",
			type: ApplicationCommandOptionType.Integer,
			required: false
		}
	], async execute(bot, interactionCreate) {
		let interactionOptions = interactionCreate.options._hoistedOptions
		if(!interactionOptions[1].value) return interactionCreate.reply("You need to provide a task or task number.")
		const currentSetOfTODOs = await db.get(`todos_${messageCreate.author.id}`)
		let numberOfTodos = 0 // it is assumed to be 0 otherwise it will be something else
		let ToDoEmbed = new EmbedBuilder()
		ToDoEmbed.setFooter({ text: Default.DefaultFooterText })
		ToDoEmbed.setColor(Default.DefaultEmbedColor)
		ToDoEmbed.setTimestamp()
		ToDoEmbed.setURL(Bot.BotSite)
		if(currentSetOfTODOs !== null) numberOfTodos = currentSetOfTODOs.length
		// following the docs and the naming scheme, I will assume this to be already an int. This is in relation to the task-number
		switch(interactionOptions[1].value) {
			case "show":
				if(numberOfTodos < 1) return interactionCreate.reply("You do not have any ToDos!")
				if(!typeof interactionOptions[1].value === "number" && !typeof interactionOptions[1].value === "string") return interactionCreate.reply(reject.WeAreScrewed.ExecutionError) // Honestly not even supposed to happen, but this is here in case.
				if(interactionOptions[1].value === "all") {
					let resultForToDoShowAllDescription = ""
					for(let i = 0; i < currentSetOfTODOs.length; i++) resultForToDoShowAllDescription += `[${i+1}] ${currentSetOfTODOs[i]}\n`
					ToDoEmbed.setTitle("Showing all the current tasks!")
					ToDoEmbed.setDescription("```" + resultForToDoShowAllDescription + "```")
					return interactionCreate.reply({ embeds: [ToDoEmbed] })
				}
				if(interactionOptions[1].value < 1 || ( interactionOptions[1].value - 1) > currentSetOfTODOs.length) return interactionCreate.reply(reject.UserFault.numbers.notInRange) // 0 is an int
				ToDoEmbed.setTitle(`Showing task ${interactionOptions[1].value}`)
				ToDoEmbed.setDescription("```" + `[${interactionOptions[1].value}] ` + currentSetOfTODOs[`${interactionOptions[1].value - 1}`] + "```")
				interactionCreate.reply({ embeds: [ToDoEmbed] })
				break
		// to add other features!
			default:
				console.error("No way...")
				console.log(interactionCreate)
				return interactionCreate.reply(reject.WeAreScrewed.ExecutionError)
		}
	}
}
