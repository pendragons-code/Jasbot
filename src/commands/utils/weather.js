const reject = require("../../../assets/items/rejection.json")
const { EmbedBuilder } = require("discord.js")
const weather = require("weather-js")
const { defaultembedcolour, defaultfootertext } = require("../../../config.json")
module.exports = {
	name: "weather",
	aliases: [],
	category: "utils",
	utilisation: "weather <destination>",
	desc: "Provides weather details using weather-js!",
	async execute(bot, messageCreate, args){
		weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
		if(!args) return messageCreate.channel.send(`${reject.user.args.missing}\n Please provide valid location!`)
		const embed = new EmbedBuilder()
		let p = (result[0].current.temperature * 9/5) + 32
		embed.setTitle(`Weather - ${result[0].location.name}`)
	  	embed.setColor(defaultembedcolour)
		embed.setFooter({ text: defaultfootertext })
	  	embed.setDescription("Temperature units can may be differ some time")
	  	embed.addFields({ name: "Temperature", value: `${result[0].current.temperature} Celsius`})
	  	embed.addFields({ name: "Temperature", value: `${p} Fahrenheit`})
	  	embed.addFields({ name: "Sky Text", value: result[0].current.skytext})
	  	embed.addFields({ name: "Humidity", value: result[0].current.humidity})
	  	embed.addFields({ name: "Wind Speed", value: result[0].current.windspeed})//What about image
	  	embed.addFields({ name: "Observation Time", value: result[0].current.observationtime})
	  	embed.addFields({ name: "Wind Display", value: result[0].current.winddisplay})
	  	embed.setThumbnail(result[0].current.imageUrl);
	  	messageCreate.channel.send({embeds:[embed]}).catch(() =>{
			return messageCreate.channel.send(reject.ExecutionError)
		})
		})
	}
}
