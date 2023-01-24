const env = require("dotenv").config()
const axios = require("axios")
async function banana() {
const TenorKey = process.env.TenorKey
	let results = await axios({
		method: "get",
		url: `https://g.tenor.com/v1/search?q=banana&key=${TenorKey}&limit=10`,
		headers: {
			"Content-Type": "application/json"
		}
	})
	console.log(results.data.results[2])
}
banana()
