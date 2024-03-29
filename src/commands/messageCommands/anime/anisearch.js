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
		anisearchEmbed.setTitle("Search Results!")
		anisearchEmbed.setFooter({ text: `Search results for ${name}!` })
		anisearchEmbed.setColor(Default.DefaultEmbedColor)
		anisearchEmbed.setThumbnail(result.image)
		anisearchEmbed.setTimestamp()
		anisearchEmbed.setURL(result.detailsLink)
		console.log(result)
		if(result.alternativeTitles.english[0]) anisearchEmbed.addFields({ name: "English Title", value: result.alternativeTitles.english[0] })
		if(result.alternativeTitles.japanese[0]) anisearchEmbed.addFields({ name: "Japanese Title", value: result.alternativeTitles.japanese[0] })
		if(result.type) anisearchEmbed.addFields({ name: "Type", value: result.type })
		if(result.episodes) anisearchEmbed.addFields({ name: "Episodes", value: result.episodes })
		if(result.aired) anisearchEmbed.addFields({ name: "Aired", value: result.aired })
		if(result.status) anisearchEmbed.addFields({ name: "Status", value: result.status })
		if(result.statistics.score.value) anisearchEmbed.addFields({ name: "Score", value: result.statistics.score.value })
		if(result.statistics.score.count) anisearchEmbed.addFields({ name: "Score Count", value: result.statistics.score.count })
		if(result.statistics.popularity) anisearchEmbed.addFields({ name: "Popularity", value: result.statistics.popularity })
		if(result.statistics.members) anisearchEmbed.addFields({ name: "Member Count", value: result.statistics.members })
		if(result.statistics.favorites) anisearchEmbed.addFields({ name: "Favorites", value: result.statistics.favorites })
		if(result.statistics.ranking) anisearchEmbed.addFields({ name: "Ranking", value: result.statistics.ranking })
		if(result.studios.length) anisearchEmbed.addFields({ name: "Studios", value: result.studios.join(",") })
		if(result.scoreStats) anisearchEmbed.addFields({ name: "Score Stats", value: result.scoreStats })
		if(result.classification) anisearchEmbed.addFields({ name: "Classification", value: result.classification })

		messageCreate.channel.send({ embeds: [anisearchEmbed] })
		.catch((error) => {
			console.log(messageCreate.content)
			console.error(error)
			return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
		})
	}
}
