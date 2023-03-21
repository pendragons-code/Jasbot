const phin = require("phin")
async function getKilometerPerHour(requestedSpeed){
	const response = await phin({
		url: "https://api.senghong.xyz/api/KilometerPerHour",
		method: "POST",
		parse: "json",
		data: {
			requestedSpeed: parseFloat(requestedSpeed)
		}
	})
	return JSON.stringify(response.body).replaceAll(",", ",\n").replaceAll("{", "").replaceAll("}", "").replace(":", ": ")
}
module.exports = { getKilometerPerHour }
