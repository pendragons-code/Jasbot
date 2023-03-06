const phin = require("phin")
async function getKm(requestedLength) {
	const response = await phin({
		url: "https://api.senghong.xyz/api/kilometer",
		method: "POST",
		data: {
			requestedLength: requestedLength
		}
	})
	return response
}
module.exports = { getKm }
// Honestly this is a bad idea. I mean i am the same person who talked about redundancy
