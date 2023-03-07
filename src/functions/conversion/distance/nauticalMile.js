const phin = require("phin")
async function getNauticalMile(requestedLength) {
	const response = await phin({
		url: "https://api.senghong.xyz/api/nauticalMile",
		method: "POST",
		data: {
			requestedLength: requestedLength
		}
	})
	return JSON.stringify(response.body).replaceAll(",", ",\n").replaceAll("{", "").replaceAll("}", "").replace(":", ": ")
}
module.exports = { getNauticalMile }
// Honestly this is a bad idea. I mean i am the same person who talked about redundancy
