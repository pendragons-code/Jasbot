const phin = require("phin")
async function getMeter(requestedLength) {
	const response = await phin({
		url: "https://api.senghong.xyz/api/meter",
		method: "POST",
		data: {
			requestedLength: requestedLength
		}
	})
	return JSON.stringify(response.body).replaceAll(",", ",\n").replaceAll("{", "").replaceAll("}", "").replace(":", ": ")
}
module.exports = { getMeter }
// Honestly this is a bad idea. I mean i am the same person who talked about redundancy
