const phin = require("phin")
async function getMicrometer(requestedLength) {
	const response = await phin({
		url: "https://api.pendragonscode.xyz/api/micrometer",
		method: "POST",
		data: {
			requestedLength: requestedLength
		}
	})
	return JSON.stringify(response.body).replaceAll(",", ",\n").replaceAll("{", "").replaceAll("}", "").replace(":", ": ")
}
module.exports = { getMicrometer }
// Honestly this is a bad idea. I mean i am the same person who talked about redundancy
