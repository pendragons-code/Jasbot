const { EmbedBuilder } = require("discord.js")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "animeme18",
	aliases: ["animemes18"],
	category: "anime",
	utilisation: "animeme",
	desc: "Sends a random meme from the r/animemes community, this version with 18, may contain nfw.",
	async execute(bot, messageCreate, args, prefix){
		const axios = await import("axios")
		const request = {
			method: "GET",
			url: 'https://reddit.com/r/animemes/random/.json'
		}

		axios.default(request).then(response => {
			let meme = response.data[0].data.children[0].data
			let memeEmbed = new EmbedBuilder()
			memeEmbed.setTitle(meme.title)
			memeEmbed.setDescription(`👍 ${meme.ups} | 👎 ${meme.downs} | 💬 ${meme.num_comments}`)
			memeEmbed.setFooter({ text: defaultfootertext })
			memeEmbed.setURL(`https://reddit.com${meme.permalink}`)
			memeEmbed.setImage(meme.url)
			memeEmbed.setColor(defaultembedcolour)
			memeEmbed.setTimestamp()
			messageCreate.channel.send({ embeds: [memeEmbed] })
		}).catch(()=> {
			return messageCreate.channel.send(reject.ExecutionError)
		})
	}
}
