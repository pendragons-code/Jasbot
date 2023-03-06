const phin = require("phin")
async function getMile(requestedLength) {
	const response = await phin({
		url: "https://api.senghong.xyz/api/mile",
		method: "POST",
		data: {
			requestedLength: requestedLength
		}
	})
	return response
}
module.exports = { getMile }
// Honestly this is a bad idea. I mean i am the same person who talked about redundancy
