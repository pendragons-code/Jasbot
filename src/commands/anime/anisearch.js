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
		const search = args.join(" ")
		malScraper.getInfoFromName(search).then((data) => {
			if(!data.url) return messageCreate.channel.send("No results!")
			let embed = new EmbedBuilder()
			embed.setFooter({ text: defaultfootertext })
			embed.setThumbnail(data.picture)
			embed.setColor(defaultembedcolour)
			embed.addField('English Title',`${data.englishTitle}`)
    			embed.addField('Japanese Title', `${data.japaneseTitle}`)
			embed.addField('Type', `${data.type}`)//data.type
			embed.addField('Episodes', `${data.episodes}`)//data.episodes
			embed.addField('Rating', `${data.rating}`)//data.rating
			embed.addField('Aired', `${data.aired}`)//data.aired
			embed.addField('Score',`${data.score}`)//data.score
			embed.addField('Score Stats', `${data.scoreStats}`)//data.scoreStats
			embed.addField('Link', `${data.url}`);
			messageCreate.channel.send({ embeds: [embed] }).catch(()=> {return messageCreate.channel.send(reject.ExecutionError)})
		})
	}
}
