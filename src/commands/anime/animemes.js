const { EmbedBuilder } = require("discord.js")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "animeme",
	aliases: ["animemes"],
	category: "anime",
	utilisation: "animeme",
	desc: "Sends a random meme from the r/animemes community",
	async execute(bot, messageCreate, args, prefix){
		const axios = await import("axios")
		const request = {
			method: "GET",
			url: 'https://reddit.com/r/animemes/random/.json?obey_over18=false'
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
