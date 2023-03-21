const phin = require("phin")
async function getMeterPerSecond(requestedSpeed){
	const response = await phin({
		url: "https://api.senghong.xyz/api/MeterPerSecond",
		method: "POST",
		parse: "json",
		data: {
			requestedSpeed: parseFloat(requestedSpeed)
		}
	})
	return JSON.stringify(response.body).replaceAll(",", ",\n").replaceAll("{", "").replaceAll("}", "").replace(":", ": ")
}
module.exports = { getMeterPerSecond }
