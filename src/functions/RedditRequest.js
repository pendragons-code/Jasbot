async function RedditRequestSFW(request){
	const axios = await import("axios")
	let response = await axios.default(request)
	if(!response.data[0]) return 404
	let output = response.data[0].data.children[0].data
	if(output.over_18){
		console.log("nsfw, retry")
		return RedditRequestSFW(request)
	}
	return output
}

async function RedditRequestNSFW(request){
	const axios = await import("axios")
	let response = await axios.default(request)
	if(!response.data[0]) return 404
	let output = response.data[0].data.children[0].data
	return output
}

async function CheckSubSFW(request){
	const axios = await import("axios")
	axios.default(request)
	if(!response.data[0]) return 404
	let output = response.data.data
	if(output.over18) return "over18"
	return "safe"
}


// Note that output.error seems to exist on some other requests that suceed!

module.exports = { RedditRequestSFW, RedditRequestNSFW, CheckSubSFW }
