const { userdb } = require("../../../bot.js")
const Discord = require("discord.js")
const { defaultembedcolour } = require("../../../config.json")
module.exports = {
	name: 'users',
	async execute(bot, messageCreate, args, prefix) {
		userdb.add(`cmd_${messageCreate.author.id}`, 1)
		let newUser = await userdb.get(`first_${messageCreate.author.id}`)
		if(newUser === null) newUser = 0
		if(newUser == 1) return 
		if(newUser === 0){
			let embed = new Discord.EmbedBuilder()
			embed.setColor(defaultembedcolour)
			embed.setDescription("Hi there! I am Jasbot, a discord bot made just for fun as a side project by the developer! It seems that this is the first time that you used one of my commands and this is why you are recieving this message! It is our responsibility to ensure that the bot is working fine and up to standard, with that, should there be any failures or flaws, do not be afraid to reach out to the dev and I hope that you have a nice day!")
			embed.setFooter({ text: "Hello there! I am a new bot that the owner made out of complete boredom for some reason." })
			embed.setTimestamp()
			embed.setTitle(`Hoiya ${messageCreate.author.username}!`)
			try{
				messageCreate.author.send({ embeds: [embed] })
				await userdb.set(`first_${messageCreate.author.id}`, 1)
			}catch(e){
				messageCreate.channel.send({ embeds: [embed] })
				await userdb.set(`first_${messageCreate.author.id}`, 1)
			}
		}
	}
}
