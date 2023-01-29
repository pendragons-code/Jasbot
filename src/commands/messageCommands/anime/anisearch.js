const malScraper = require("mal-scraper")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { EmbedBuilder } = require("discord.js")
const { Default } = require("../../../../config.json")
module.exports = {
	name: "anisearch",
	aliases: ["animesearch"],
	category: "anime",
	utilisation: "anisearch <search terms here>",
	desc: "Scrapes items off MAL! (My Anime List)",
	async execute(bot, messageCreate, args, mainPrefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.args.missing)
		const name = args.join(" ")
		let result = await malScraper.getInfoFromName(name)
		let nsfwRating = ["R - 17+ (violence & profanity)", "R+ - Mild Nudity", "Rx - Hentai"]
		if(nsfwRating.includes(result.rating) && !messageCreate.channel.nsfw) return messageCreate.channel.send("NSFW content only in NSFW channels!")
		const anisearchEmbed = new EmbedBuilder()
		anisearchEmbed.setFooter({ text: `Search results for ${name}!` })
		anisearchEmbed.setColor(Default.DefaultEmbedColor)
		anisearchEmbed.setThumbnail(result.picture)
		anisearchEmbed.setTimestamp()
		if(result.englishTitle) anisearchEmbed.addFields({ name: "English Title", value: `${result.englishTitle}` })
		if(result.japaneseTitle) anisearchEmbed.addFields({ name: "Japanese Title", value: `${result.japaneseTitle}` })
		if(result.type) anisearchEmbed.addFields({ name: "Type", value: result.type })
		if(result.episodes) anisearchEmbed.addFields({ name: "Episodes", value: result.episodes })
		anisearchEmbed.addFields({ name: "Rating", value: result.rating })
		if(result.aired) anisearchEmbed.addFields({ name: "Aired", value: result.aired })
		if(result.score) anisearchEmbed.addFields({ name: "Score", value: result.score })
		if(result.scoreStats) anisearchEmbed.addFields({ name: "Score Stats", value: result.scoreStats })
		if(result.url) anisearchEmbed.setURL(result.url)

		messageCreate.channel.send({ embeds: [anisearchEmbed] })
		.catch((error) => {
			console.log(messageCreate.content)
			console.error(error)
			return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
		})
	}
}
