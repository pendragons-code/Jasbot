const phin = require("phin")
async function getYard(requestedLength) {
	const response = await phin({
		url: "https://api.senghong.xyz/api/yard",
		method: "POST",
		data: {
			requestedLength: requestedLength
		}
	})
	return response
}
module.exports = { getYard }
// Honestly this is a bad idea. I mean i am the same person who talked about redundancy
