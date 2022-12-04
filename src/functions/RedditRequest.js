async function RedditRequestSFW(request){
	const axios = await import("axios")
	let response = await axios.default(request)
	let output = response.data[0].data.children[0].data
	if(output.over_18){
		console.log("nsfw, retry")
		return RedditRequestSFW(request)
	}
	return output
}

async function RedditRequestNSFW(request){
	const axios = await import("axios")
	axios.default(request).then(response => {
		let output = response.data[0].data.children[0].data
		return output
	})
}

async function CheckSubSFW(request){
	const axios = await import("axios")
	axios.default(request).then(response => {
		let output = response.data.data
		if(output.over18) return "over18"
		return "safe"
	})
}

module.exports = { RedditRequestSFW, RedditRequestNSFW, CheckSubSFW }
