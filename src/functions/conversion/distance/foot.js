const phin = require("phin")
async function getFoot(requestedLength) {
	const response = await phin({
		url: "https://api.pendragonscode.xyz/api/foot",
		method: "POST",
		data: {
			requestedLength: requestedLength
		}
	})
	return JSON.stringify(response.body).replaceAll(",", ",\n").replaceAll("{", "").replaceAll("}", "").replace(":", ": ")
}
module.exports = { getFoot }
// Honestly this is a bad idea. I mean i am the same person who talked about redundancy
// But I will leave this here first. I will probably come back to change this in the future.
