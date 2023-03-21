const phin = require("phin")
async function getFootPerSecond(requestedSpeed){
	const response = await phin({
		url: "https://api.senghong.xyz/api/FootPerSecond",
		method: "POST",
		parse: "json",
		data: {
			requestedSpeed: parseFloat(requestedSpeed)
		}
	})
	return JSON.stringify(response.body).replaceAll(",", ",\n").replaceAll("{", "").replaceAll("}", "").replace(":", ": ")
}
module.exports = { getFootPerSecond }
