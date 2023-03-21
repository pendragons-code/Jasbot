const phin = require("phin")
async function getMm(requestedLength) {
	const response = await phin({
		url: "https://api.senghong.xyz/api/millimeter",
		method: "POST",
		data: {
			requestedLength: requestedLength
		}
	})
	return JSON.stringify(response.body).replaceAll(",", ",\n").replaceAll("{", "").replaceAll("}", "").replace(":", ": ")
}
module.exports = { getMm }
// Honestly this is a bad idea. I mean i am the same person who talked about redundancy