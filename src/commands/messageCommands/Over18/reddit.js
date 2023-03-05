// ONLY FOR SCIENCE :(
const { getNsfwRedditPost } = require("../../../functions/reddit/notSoSFW.js")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { Default } = require("../../../../config.json")
const { EmbedBuilder } = require("discord.js")
module.exports = {
	name: "nsfwreddit", // I know I write very bad code :(
	aliases: [],
	category: "over18",
	utilisation: "nsfwreddit <subreddit>",
	desc: "Reddit command, but it allows nsfw. This was only added because a few friends I had like to get posts from human and animal anatomy subreddits. GO HORNI JAIL :(.",
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.args.missing)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.args.tooMany)
		if(args[0].startsWith("r/")) args[0].replace("r/", "")
		let redditPost = await getNsfwRedditPost(args[0])
		let redditEmbed = new EmbedBuilder()
		redditEmbed.setTitle(redditPost.title)
		redditEmbed.setURL(`https://reddit.com${redditPost.permalink}`)
		redditEmbed.setDescription(`👍 ${redditPost.ups} | 👎 ${redditPost.downs} | 💬 ${redditPost.comments}`)
		redditEmbed.setColor(Default.DefaultEmbedColor)
		redditEmbed.setFooter({ text: Default.DefaultFooterText })
		redditEmbed.setTimestamp()
		if(redditPost.url)redditEmbed.setImage(redditPost.url)
		return messageCreate.channel.send({ embeds: [redditEmbed] })
	}
}
