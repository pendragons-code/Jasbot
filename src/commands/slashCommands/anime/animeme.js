const { EmbedBuilder } = require("discord.js")
const { Default } = require("../../../../config.json")
const { sfwGetPostReddit } = require("../../../fuctions/reddit/sfw.js")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "animeme",
	category: "anime",
	utilisation: "animeme",
	description: "Sends a random meme from the r/animemes or r/wholesomeanimemes community.",
	async execute(bot, interactionCreate) {
		let subredditArray = ["animeme", "wholesomeanimemes"]
		let subreddit = subredditArray[Math.floor(Math.random() * subredditArray.length)]
		let animemePost = await sfwGetPostReddit(subreddit)
		let animemeEmbed = new EmbedBuilder()
		animemeEmbed.setColor(Default.DefaultEmbedColor)
		animemeEmbed.setFooter({ text: Default.DefaultEmbedColor })
		animemeEmbed.setURL(`https://reddit.com${animemePost.permalink}`)
		animemeEmbed.setDescription(`👍 ${animemePost.ups} | 👎 ${animemePost.downs} | 💬 ${animemePost.comments}`)
		animemeEmbed.setTimestamp()
		animemeEmbed.setImage(animemePost.url)
		animemeEmbed.setTitle(animemePost.title)
		interactionCreate.reply({ embeds: [animemeEmbed] })
		.catch((error) => {
			console.error(error)
			console.log(interactionCreate)
			return interactionCreate.reply(reject.WeAreScrewed.ExecutionError)
		})
	}
}
