async function test() {
	const env = require("dotenv").config()
	const currencyApiKey = process.env.RapidCurrency
	const axios = await import("axios")
		let options = {
			method: "GET",
			url: "https://currency-exchange.p.rapidapi.com/exchange",
			params: { to: "MYR", from: "SGD", q: 50 },
			headers: {
				"x-rapidapi-host": "currency-exchange.p.rapidapi.com",
				"x-rapidapi-key": currencyApiKey
			}
		}
		let response = await axios.default(options)
	console.log(response.data)

}
test()
