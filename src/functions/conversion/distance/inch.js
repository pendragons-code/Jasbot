const phin = require("phin")
async function getInch(requestedLength) {
	const response = await phin({
		url: "https://api.pendragonscode.xyz/api/Inch",
		method: "POST",
		data: {
			requestedLength: requestedLength
		}
	})
	return JSON.stringify(response.body).replaceAll(",", ",\n").replaceAll("{", "").replaceAll("}", "").replace(":", ": ")
}
module.exports = { getInch }
// Honestly this is a bad idea. I mean i am the same person who talked about redundancy
