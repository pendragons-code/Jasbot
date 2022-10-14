const api = require("novelcovid")
const reject = require("../../../assets/items/rejection.json")
const { EmbedBuilder } = require("discord.js")
const { defaultfootertext, defaultembedcolour } = require("../../../config.json")
module.exports = {
	name: "country",
	aliases: [],
	category: "utils",
	utilisation: "country <country name>",
	desc: "Shows covid details for a specific country that is listed. Based on novelcovid api (npm).",
	async execute(bot, messageCreate, args, prefix){
		if(!args) return messageCreate.channel.send(reject.user.args.missing)
		const countrydata = await api.countries({country : args.join(" ")})
		const countryembed = new EmbedBuilder()
		countryembed.setColour(defaultembedcolour)
		countryembed.setDescription("Numbers here are estimated!")
		countryembed.setTitle(`${countrycovid} cases!`)
		countryembed.setfooter({ text: defaultfootertext })
    		countryembed.addField("Cases" , `${countrydata.cases}`)
    		countryembed.addField("Active" , `${countrydata.active}`)
    		countryembed.addField("Deaths" , `${countrydata.deaths}`)
    		countryembed.addField("Critical Cases" , `${countrydata.critical}`)
    		countryembed.addField("Recovered" , `${countrydata.recovered}`)
    		countryembed.setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMuMJvHwdul74INvu1iJ-rwXMBnJqU10nweQ&usqp=CAU')
    		messageCreate.channel.send({embeds:[countryembed]}).catch(() => {
			console.error()
			console.log(messageCreate.content)
			return messageCreate.channel.send(reject.ExecutionError)
		})
	}
}
