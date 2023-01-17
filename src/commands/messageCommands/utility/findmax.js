const reject = require("../../../../assets/responseComponents/rejection.json")
const { numberFilter } = require("../../../functions/array/numberFilter.js")
module.exports = {
	name: "findmax",
	aliases: [],
	category: "utility",
	utilisation: "findmax <numbers separated by spaces>",
	desc: "Returns the maximum number in arguments!",
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0] || numberFilter(parseFloat(args)) === false) return messageCreate.channel.send(reject.UserFault.numbers.missing)
		if(!args[1]) return messageCreate.channel.send("Really? Are you really doing this? There is only one numerical provided! ARE YOU KIDDING ME!?!?!?!?")
		messageCreate.channel.send(Math.max(parseFloat(args)))
	}
}
