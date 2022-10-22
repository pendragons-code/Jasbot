const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "findmax",
	aliases: [],
	category: "utils",
	utilisation: "findmax <numbers serperated by spaces>",
	desc: "Finds the maximum number in the provided arguments.",
	async execute(bot, messageCreate, args, prefix){
		function onlyNumbers(array) {
			return array.every(element => {
				return typeof element === 'number';
			});
}		
		if(onlyNumbers(args) == false) return messageCreate.channel.send(reject.user.number.missing)
		const array = parseFloat(args)
		messageCreate.channel.send(Math.max(array))
	}
}
