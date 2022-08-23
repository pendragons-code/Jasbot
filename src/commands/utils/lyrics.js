const { EmbedBuilder } = require("discord.js")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "lyrics",
	aliases: [],
	category: "utils",
	utilisation: "lyrics <query>",
	desc: "Sends link or lyrics to your dms",
	async execute(bot, messageCreate, args, prefix){
		const fetch = await import("node-fetch")
		if(!args[0]) return messageCreate.channel.send(reject.user.args.missing)
		messageCreate.channel.send("Please check your Direct Messages.")
		messageCreate.react("🔗")
		fetch(`https://some-random-api.ml/lyrics?title=${args.join(" ")}`)
		.then(res => res.json())
		.then(json => {
			const embed = new EmbedBuilder()
			embed.setFooter({ text: "Lyrics provided by some-random-api.ml!" })
			embed.setColor(defaultembedcolour)
			embed.setTitle(`Results for ${json.title}`)
			embed.setTimestamp()
			embed.setDescription(json.lyrics)
			embed.setImage(json.thumbnail.genius)
			messageCreate.author.send({ embeds: [embed] })
				.catch(() => {
					messageCreate.author.send("Too many characters, sending link instead!")
					messageCreate.author.send(`🔗 ${json.link.genius}`)
						.catch(()=> { return messageCreate.reply("Something went wrong, it seems that I cannot DM you!") })
				})
		})
	}
}
