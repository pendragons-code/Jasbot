const phin = require("phin")
async function getKnot(requestedSpeed){
	const response = await phin({
		url: "https://api.pendragonscode.xyz/api/knot",
		method: "POST",
		parse: "json",
		data: {
			requestedSpeed: parseFloat(requestedSpeed)
		}
	})
	return JSON.stringify(response.body).replaceAll(",", ",\n").replaceAll("{", "").replaceAll("}", "").replace(":", ": ")
}
module.exports = { getKnot }
