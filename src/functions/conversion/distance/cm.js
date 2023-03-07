const phin = require("phin")
async function getCm(requestedLength) {
	const response = await phin({
		url: "https://api.senghong.xyz/api/centimeter",
		method: "POST",
		parse: "json",
		data: {
			requestedLength: parseFloat(requestedLength)
		}
	})
	return JSON.stringify(response.body).replaceAll(",", ",\n").replaceAll("{", "").replaceAll("}", "").replace(":", ": ")
}
module.exports = { getCm }
// Honestly this is a bad idea. I mean i am the same person who talked about redundancy
