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
	  	embed.addField("Temperature", `${result[0].current.temperature} Celsius`, true)
	  	embed.addField("Temperature", `${p} Fahrenheit`, true)
	  	embed.addField("Sky Text", result[0].current.skytext, true)
	  	embed.addField("Humidity", result[0].current.humidity, true)
	  	embed.addField("Wind Speed", result[0].current.windspeed, true)//What about image
	  	embed.addField("Observation Time", result[0].current.observationtime, true)
	  	embed.addField("Wind Display", result[0].current.winddisplay, true)
	  	embed.setThumbnail(result[0].current.imageUrl);
	  	messageCreate.channel.send({embeds:[embed]}).catch(() =>{
			return messageCreate.channel.send(reject.ExecutionError)
		})
		})
	}
}
