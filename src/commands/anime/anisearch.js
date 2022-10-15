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
	async execute(bot, messageCreate, args, prefix){
		if(!args[0]) return messageCreate.channel.send(reject.user.args.invalid)
			const name = `${args}`
			if(!args) return messageCreate.channel.send(reject.user.args.missing)
			malScraper.getInfoFromName(name)
			.then((data) => {
				const embed = new EmbedBuilder()
				.setFooter({text:`Search results from My Anime List for ${name}`.split(',').join(' ')})
				.setColor(defaultembedcolour)
				.setThumbnail(data.picture)
				.setTimestamp()
				.addFields({name: 'English Title', value: `${data.englishTitle}`})
				.addFields({name: 'Japanese Title', value: `${data.japaneseTitle}`})
				.addFields({name: 'Type', value: `${data.type}`})//data.type
				.addFields({name: 'Episodes', value: `${data.episodes}`})//data.episodes
				.addFields({name: 'Rating', value: `${data.rating}`})//data.rating
				.addFields({name: 'Aired', value: `${data.aired}`})//data.aired
				.addFields({name: 'Score', value: `${data.score}`})//data.score
				.addFields({name: 'Score Stats', value: `${data.scoreStats}`})//data.scoreStats
				.addFields({name: 'Link', value: `${data.url}`});//data.url
			
				messageCreate.channel.send({embeds:[embed]})
			})
		}
	}