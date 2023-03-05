const { db } = require("quick.db")
const { reject } = require("../../../../assets/responseComponents/rejection.json")
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
		if(editmode === null) editmode = "off"  // Will no longer use "1" and "0" to represent editmode state.
		switch(args[0]) {
			case "on":
				break
		}
	}
}
