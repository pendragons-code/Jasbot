const { EmbedBuilder } = require("discord.js")
const { Default } = require("../../../../config.json")
const { sfwGetPostReddit } = require("../../../functions/reddit/sfw.js")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "animeme",
	aliases: ["animemes"],
	category: "anime",
	utilisation: "animeme",
	desc: "Sends a random meme from the r/animemes or r/wholesomeanimemes community",
	async execute(bot, messageCreate, args, mainPrefix) {
		let subredditArray = ["animeme", "wholesomeanimemes"]
		let subreddit = subredditArray[Math.floor(Math.random() * subredditArray.length)]
		let animemePost = await sfwGetPostReddit(subreddit)
		let animemeEmbed = new EmbedBuilder()
		animemeEmbed.setColor(Default.DefaultEmbedColor)
		animemeEmbed.setFooter({ text: Default.DefaultFooterText })
		animemeEmbed.setURL(`https://reddit.com${animemePost.permalink}`)
		animemeEmbed.setDescription(`👍 ${animemePost.ups} | 👎 ${animemePost.downs} | 💬 ${animemePost.comments}`)
		animemeEmbed.setTimestamp()
		animemeEmbed.setImage(animemePost.url)
		animemeEmbed.setTitle(animemePost.title)
		messageCreate.channel.send({ embeds: [animemePost] })
		.catch((error) => {
			console.error(error)
			console.log(messageCreate.content)
			return messageCreate.channel.send(reject.ExecutionError)
		})
	}
}
