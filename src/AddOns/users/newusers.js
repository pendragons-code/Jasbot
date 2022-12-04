const { db } = require("../../../Loaders/Jasbot.js")
const { EmbedBuilder } = require("discord.js")
const { defaultembedcolour, defaultfootertext, botID } = require("../../../config.json")
module.exports = {
	name: "newuser",
	async execute(Jasbot, messageCreate, args) {
		const newUserCheck = await db.get(`newUser_${messageCreate.author.id}`)
		if(newUserCheck != null) return
		const embed = new EmbedBuilder()
		embed.setTitle("Hello there new user!")
		embed.setDescription(`Hello there! I am a side project made by PENDRAGON#8785! Because this is the first time you are using this bot, I am sending this message to tell you more about myself! I am Jasbot, a simple discord bot with basic features implemented for easy use! My features primarily circle around simplicity and utility features. If there is anything wrong or anything you would like to tell the developer, do not be afraid to reach out to him! I am just a simple project, so if you enjoyed using this bot, please share this bot with your friends if you can! Thank you very much!`)
		embed.setFooter({ text: defaultfootertext })
		embed.setTimestamp()
		embed.setColor(defaultembedcolour)
		messageCreate.channel.send({ embeds: [embed] })
		await db.set(`newUser_${messageCreate.author.id}`)
		.catch((error) => {
			return console.error("Error!", error)
		})
	}
}
