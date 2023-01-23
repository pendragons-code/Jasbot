const reject = require("../../../../assets/responseComponents/rejection.json")
const { Default, Bot } = require("../../../../config.json")
const { EmbedBuilder } = require("discord.js")
const { sfwRedditCheck, sfwGetPostReddit } = require("../../../functions/reddit/sfw.js")
module.exports = {
	name: "reddit",
	aliases: [],
	category: "utility",
	utilitsation: "reddit <subreddit>",
	desc: "Extracts random post from specified subreddit. This may not work if post is nsfw, private or deleted.",
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.args.missing)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.args.tooMany)
		let subreddit = args[0]
		if(args[0].startsWith("r/")) subreddit.replace("r/", "")
		let sfwSubredditStatus = await sfwRedditCheck(subreddit)
		if(sfwSubredditStatus === "nsfw") return messageCreate.channel.send("The subreddit you provided is NSFW!")
		let sfwPost = await sfwGetPostReddit(subreddit)
		let redditEmbed = new EmbedBuilder()
		redditEmbed.setTitle(sfwPost.title)
		redditEmbed.setDescription(`👍 ${sfwPost.ups} | 👎 ${sfwPost.downs} | 💬 ${sfwPost.comments}`)
		redditEmbed
		redditEmbed
		redditEmbed
		redditEmbed
	}
}
