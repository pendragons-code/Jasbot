const malScraper = require('mal-scraper')
const { defaultembedcolour, defaultfootertext } = require("../../../config.json")
const { EmbedBuilder } = require("discord.js")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "anisearch",
	aliases: [],
	category: "anime",
	utilisation: "anisearch <anime name here>",
	desc: "Scrapes some stuff from MAL!",
	async execute(bot, messageCreate, args, prefix) {
		if (!args[0]) return messageCreate.channel.send(reject.user.args.invalid)
		const name = `${args}`
		if (!args) return messageCreate.channel.send(reject.user.args.missing)
		malScraper.getInfoFromName(name)
			.then((data) => {
				let nsfw = ["R - 17+ (violence & profanity)", "R+ - Mild Nudity", "Rx - Hentai"]
				if (nsfw.includes(data.rating) && !messageCreate.channel.nsfw) return messageCreate.channel.send("Content is NSFW, this only works in NSFW channels.")
				const embed = new EmbedBuilder()
				embed.setFooter({ text: `Search results from My Anime List for ${name}`.split(',').join(' ') })
				embed.setColor(defaultembedcolour)
				embed.setThumbnail(data.picture)
				embed.setTimestamp()
				let englishTitle = data.englishTitle ? data.englishTitle : "Not Available"
				let japaneseTitle = data.japaneseTitle ? data.japaneseTitle : "Not Available"
				let type = data.type ? data.type : "Not Available"
				let episodes = data.episodes ? data.episodes : "Not Available"
				let rating = data.rating ? data.rating : "Not Available"
				let aired = data.aired ? data.aired : "Not Available"
				let score = data.score ? data.score : "Not Available"
				let scoreStats = data.scoreStats ? data.scoreStats : "Not Available"
				let url = data.url ? data.url : "Not Available"
				embed.addFields({ name: 'English Title', value: `${englishTitle}` })
				embed.addFields({ name: 'Japanese Title', value: `${japaneseTitle}` })
				embed.addFields({ name: 'Type', value: `${type}` })//data.type
				embed.addFields({ name: 'Episodes', value: `${episodes}` })//data.episodes
				embed.addFields({ name: 'Rating', value: `${rating}` })//data.rating
				embed.addFields({ name: 'Aired', value: `${aired}` })//data.aired
				embed.addFields({ name: 'Score', value: `${score}` })//data.score
				embed.addFields({ name: 'Score Stats', value: `${scoreStats}` })//data.scoreStats
				embed.addFields({ name: 'Link', value: `${url}` });//data.url

				messageCreate.channel.send({ embeds: [embed] })
			})
	}
}
