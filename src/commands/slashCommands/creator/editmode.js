const { db } = require("quick.db")
const { ApplicationCommandOptionType } = require("discord.js")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "editmode",
	utilisation: "editmode <on/off/check>",
	category: "creator",
	description: "Sets the bot into editmode, a state only usable by the creator!",
	options: [
		{
			name: "state",
			description: "<on/off/check>",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{ name: "off", value: "off" },
				{ name: "on", value: "on" },
				{ name: "check", value: "check" }
			]
		}
	],
	async execute(bot, interactionCreate) {
		let state = interactionCreate.options._hoistedOptions[0].value
		let editmode = await db.get("editmode")
		switch(state) {
			case "on":
				if(editmode === "on") return interactionCreate.reply("Editmode is already on!")
				await db.set("editmode", "on").catch((error) => {
					console.error(error)
					console.log(interactionCreate)
					return interactionCreate.reply(reject.WeAreScrewed.ExecutionError)
				})
				interactionCreate.reply("Turning on editmode.")
				break;

			case "off":
				if(editmode === null) return interactionCreate.reply("Editmode is already off!")
				await db.delete("editmode").catch((error) => {
					console.error(error)
					console.log(interactionCreate)
					return interactionCreate.reply(reject.WeAreScrewed.ExecutionError)
				})
				break;
			case "check":
				if(editmode === null) editmode = "off"
				interactionCreate.reply(`Editmode is ${editmode}!`)
				break;
		}
	}
}
