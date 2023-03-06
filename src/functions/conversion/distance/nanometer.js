const phin = require("phin")
async function getNm(requestedLength) {
	const response = await phin({
		url: "https://api.senghong.xyz/api/nanometer",
		method: "POST",
		data: {
			requestedLength: requestedLength
		}
	})
	return response
}
module.exports = { getNm }
// Honestly this is a bad idea. I mean i am the same person who talked about redundancy
