const { db } = require("quick.db")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "editmode",
	aliases: [],
	category: "creator",
	desc: "Sets the bot into editmode, a state only useable by the creator!",
	utilisation: "editmode <on/off/check>",
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.args.missing)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.args.tooMany)
		let editmode = await db.get("editmode")
		switch(args[0]) {
			case "on":
				if(editmode === "on") return messageCreate.channel.send("Editmode is already on!")
				await db.set("editmode", "on").catch((error) => {
					console.error(error)
					console.log(messageCreate.content)
					return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
				})
				messageCreate.channel.send("Turning on editmode.")
				break

			case "off":
				if(editmode === null) return messageCreate.channel.send("Editmode is already off!")
				await db.delete("editmode").catch((error) => {
					console.error(error)
					console.log(messageCreate.content)
					return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
				})
				messageCreate.channel.send("Turning off editmode.")
				break
			
			case "check":
				if(editmode === null) editmode = "off"
				messageCreate.channel.send(`Editmode is ${editmode}!`)
				break

			default:
				return messageCreate.channel.send(reject.UserFault.args.invalid)
		}
	}
}
