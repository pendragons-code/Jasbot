const phin = require("phin")
async function getInch(requestedLength) {
	const response = await phin({
		url: "https://api.senghong.xyz/api/Inch",
		method: "POST",
		data: {
			requestedLength: requestedLength
		}
	})
	return response
}
module.exports = { getInch }
// Honestly this is a bad idea. I mean i am the same person who talked about redundancy
