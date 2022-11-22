const { OwnerID } = require("../../../config.json")
const { botconfigdb } = require("../../../bot.js")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "editmode",
	aliases: [],
	category: "creator",
	utilistaion: "editmode <on/off/check>",
	desc: "Sets bot to editmode, only usable by creator!",
	async execute(bot, messageCreate, args, prefix){
		if(messageCreate.author.id != OwnerID) return messageCreate.channel.send(reject.CreatorOnly)
		if(!args[0]) return mesasageCreate.channel.send(reject.user.args.missing)
		let editmode = await botconfigdb.get('editmode')
		if(editmode === null) editmode = "1"
		switch(args[0]){
				//1 is off, 0 is on
			case "on":
				if(editmode === "0") return messageCreate.channel.send("Editmode is already on.")
				botconfigdb.set(`editmode`, '0').catch((error) =>{
					console.error("error", error)
					console.log(messageCreate.content)
					return messageCreate.channel.send(reject.ExecutionError)
				})
				messageCreate.channel.send("Turning on editmode.")
				break

			case "off":
				if(editmode === "1") return messageCreate.channel.send("Editmode is already off.")
				botconfigdb.set(`editmode`, '1').catch((error) =>{
					console.error("error", error)
					console.log(messageCreate.content)
					return messageCreate.channel.send(reject.ExecutionError)
				})
				messageCreate.channel.send("Turning off editmode.")
				break

			case "check":
				try{
					if(editmode === "1") return messageCreate.channel.send("Editmode is off!")
					if(editmode === "0" || editmode === null) return messageCreate.channel.send("Editmode is on!")
				}catch(e){
					return messageCreate.channel.send(reject.ExecutionError)
				}
				break
		}
	}
}
