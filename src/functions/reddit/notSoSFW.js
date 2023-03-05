// I must say that I do not condone porn, gore or anything in that vein. but I also do understand that there are some people who want this feature because I had some people from a small discord community who were interested in the human anatomy and it included what could be considered nsfw.
// This is the only valid reason that I will allow for the existence of this feature on this bot.
//
// I might also consider migrating the bot to using phin, instead of axios. But I may implement something that may make use of some other features only available to axios.

const axios = require("axios")
// You may notice the subreddit check is not a thing here, and you would be right. There is no need to implement it now in the current context.
async function getNsfwRedditPost(subreddit) {
	// for human anatomy and science!!!!
	const nsfwGetPostRequest = {
		method: "GET",
		url: `https://reddit.com/r/${subreddit}/random.json`
	}

	let resultNsfwReddit = await axios(nsfwGetPostRequest)
	let discordEmbedOnlyData = await resultNsfwReddit.data[0].data.children[0].data
	return discordEmbedOnlyData
}
module.exports = { getNsfwRedditPost }
