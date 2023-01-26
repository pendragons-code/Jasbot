const env = require("dotenv").config()
const axios = require("axios")
async function banana() {
const TenorKey = process.env.TenorKey
	let results = await axios({
		method: "get",
		url: `https://reddit.com/r/Animemes/random/.json`,
		headers: {
			"Content-Type": "application/json"
		}
	})
	console.log(results.data[0].data.children[0].data)
}
banana()
