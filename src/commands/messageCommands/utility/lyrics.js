const { db } = require("../../../loaders/bot.js")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../config.json")
const axios = require("axios")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "lyrics",
	aliases: [],
	category: "utility",
	utilisation: "lyrics <here> <query>",
	desc: "Sends lyrics/link in current channel! Bot will attempt to send lyrics, but if it is too long, it will send a link instead!",
	async execute(bot, messageCreate, args, mainPrefix) {
		let results = await axios({
			method: "get",
			url: "https://some-random-api.ml/lyrics?title?=",
			headers: {
				"Content-Type": "application/json",
				"Accept-Encoding": "gzip,deflate,compress"
			}
		})
		if(!results.links.genius) return messageCreate.channel.send(reject.WeAreScrewed.BadApiResponse)
		if(results.data.error) return messageCreate.channel.send(reject.WeAreScrewed.BadApiResponse)
		//vulgar check
		let MusicVulgarCheckStatus = await db.get(`MusicVulgarCheckStatus_${messageCreate.guild.id}`)
		let MusicLyricsEmbed = new EmbedBuilder()
		if(MusicVulgarCheckStatus === "yes" && results.data.lyrics.includes(Default.DefaultBannedWords)) MusicLyricsEmbed.addFields({ name: "Warning!", value: "Results retrieved includes vulgar. Please delete link if not allowed in server!" })
		MusicLyricsEmbed.setURL(results.link.genius)
		MusicLyricsEmbed.setFooter({ text: Default.DefaultFooterText })
		MusicLyricsEmbed.setColor(Default.DefaultEmbedColor)
		MusicLyricsEmbed.setTimestamp()
		MusicLyricsEmbed.setDescription(results.data.lyrics)
		MusicLyricsEmbed.setImage(results.data.thumbnail.genius)
		MusicLyricsEmbed.setTitle(`Results for ${results.data.title}`)
		messageCreate.channel.send({ embeds: [MusicLyricsEmbed] })
		.catch(() => {
			messageCreate.channel.send("Too many characters, sending link instead!")
			mesasgeCreate.channel.send(`🔗 ${results.data.link.genius}`)
			.catch((error) => {
				console.error(error)
				console.log(messageCreate.content)
				return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
			})
		})
	}
}
