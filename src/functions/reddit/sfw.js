const axios = require("axios")
async function sfwRedditCheck(subreddit) {
	const sfwCheck = {
		method: "GET",
		url: `https://reddit.com/r/${subreddit}/about.json`
	}
	axios(sfwCheck).then((response) => {
		let subDetails = response.data.data
		if(subDetails.over18) return "nsfw"
	})
}

async function sfwGetPostReddit(subreddit) {
	const sfwSubredditRequest = {
		method: "GET",
		url: `https://reddit.com/r/${subreddit}/random.json`
	}

	let resultSfwReddit = await axios(sfwSubredditRequest)
	let discordOnlyData = await resultSfwReddit.data[0].data.children[0].data
	if(discordOnlyData.over18) return sfwGetPostReddit(subreddit)
	return discordOnlyData
}
module.exports = { sfwRedditCheck, sfwGetPostReddit }
