const dotenv = require("dotenv").config
const currencykey = process.env.rapidapicurrency
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "currencyconert",
	aliases: [],
	category: "utils",
	utilisation: "currencyconert <from> <to> <amt>",
	desc: "Converts currency from the first to the second type with the 3rd argument being the amount.",
	async execute(bot, messageCreate, args, prefix){
		const axios = await import("axios")
		if(args[0] === "list"){
    			let list = `'SGD', 'MYR', 'EUR','USD', 'AUD', 'JPY','CNH', 'HKD', 'CAD','INR', 'DKK', 'GBP','RUB', 'NZD', 'MXN','IDR', 'TWD', 'THB','VND'`
   			 return messageCreate.channel.send(list)
		}

		if(!parseInt(isNaN(args[2]))){
			var options = {
			  method: 'GET',
			  url: 'https://currency-exchange.p.rapidapi.com/exchange',
			  params: {to: args[1], from: args[0], q: args[2]},
			  headers: {
			    'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
			    'x-rapidapi-key': apikey1
			  }
			}
		}

		axios.default(options).then(function (response){
			messageCreate(`${args[2]} in ${args[0]} is ${response.data, args[1]} `)
		}).catch((error) =>{
			console.error("error", error)
			console.log(messageCreate.content)
			return messageCreate.channel.send(reject.ExecutionError)
		})
	}
}
