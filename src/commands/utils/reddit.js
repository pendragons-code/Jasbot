const { EmbedBuilder } = require("discord.js")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "reddit",
	aliases: [],
	category: "utils",
	utilisation: "reddit <subreddit>",
	desc: "Extracts random post from specified subreddit. May not work if the subreddit is nsfw, private or locked.",
	async execute(bot, messageCreate, args, prefix){
		const axios = await import("axios")
		if(!args[0]) return messageCreate.channel.send(reject.user.args.missing)
		if(args[1]) return messageCreate.channel.send(reject.user.args.toomany)
		const subreddit = args[0]
		if(!subreddit.startsWith("r/")) return messageCreate.channel.send("You need to provide a subreddit! E.G.: `r/meme`")
		
				//let memeEmbed = new EmbedBuilder()
				//memeEmbed.setTitle(meme.title)
				//memeEmbed.setDescription(`👍 ${meme.ups} | 👎 ${meme.downs} | 💬 ${meme.num_comments}`)
				//memeEmbed.setFooter({ text: defaultfootertext })
				//memeEmbed.setURL(`https://reddit.com${meme.permalink}`)
				//memeEmbed.setImage(meme.url)
				//memeEmbed.setColor(defaultembedcolour)
				//memeEmbed.setTimestamp()
				//messageCreate.channel.send({ embeds: [memeEmbed] })
		const request = {
			method: "GET",
			url: `https://reddit.com/${subreddit}/random/.json`
		}

		async function makereq(a){
			let output = await axios.default(a)
			let meme = output.data[0].data.children[0].data
			if(meme.over_18 == true) {
				console.log("is NSFW")
				console.log(meme)
				return makereq(a)
			}
			return meme
		}
		
		let res = await makereq(request)
		console.log(res)
	}
}
