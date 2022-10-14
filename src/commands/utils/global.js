const api = require('novelcovid')
const { EmbedBuilder } = require("discord.js")
const reject = require("../../../assets/items/rejection.json")
const { defaultembedcolour, defaultfootertext } = require("../../../config.json")
module.exports = {
	name: "global",
	aliases: [],
	category: "utils",
	utilisation: "global",
	desc: "Shows covid details for the world. Based on novelcovid api (npm).",
	async execute(bot, messageCreate, args, prefix){
		const data = await api.all()
		const globalembed = new EmbedBuilder()
		globalembed.setTitle("Worldwide cases for covid!")
		globalembed.setDescription("Number of cases are estimated!")
		globalembed.addField("Cases " , `${data.cases}`)
		globalembed.setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMuMJvHwdul74INvu1iJ-rwXMBnJqU10nweQ&usqp=CAU")
		globalembed.addField("Active " , `${data.active}`)
		globalembed.addField("Deaths " , `${data.deaths}`)
		globalembed.addField("Critical Cases" ,`${data.critical}`)
		globalembed.addField("Recovered" , `${data.recovered}`)
		messageCreate.channel.send({embeds: [globalembed] }).catch(() => {
			console.error()
			console.log(message.content)
			return messageCreate.channel.send(reject.ExecutionError)
		})
	}
}
