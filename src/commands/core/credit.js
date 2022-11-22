const { EmbedBuilder } = require("discord.js")
const { defaultembedcolour, defaultfootertext } = require("../../../config.json")
const PackageDetails = require("../../../package.json")
const ProfilePic = require("../../../assets/Art/image credit.json")
const reject = require("../../../assets/items/rejection.json")
module.exports = {
	name: "credits",
	aliases: [],
	category: "core",
	desc: "Sends credits for how the bot exists",
	utilisation: "credits",
	async execute(bot, messageCreate, args, prefix){
		let dependencies = Object.keys(PackageDetails.dependencies).map(x => `\`${x}\``).join(", ")
		let description = `
		Bot creator: ${PackageDetails.author}
		Bot site: ${PackageDetails.botsite}
		Bot version: ${PackageDetails.version}
		Bot repo: ${PackageDetails.git_repo}
		Bot libraries: ${dependencies}
		Bot Profile Pic: ${ProfilePic.URL}
		Bot Profile Pic artist: ${ProfilePic.Creator}

		` + "APIs: `some-random-api.ml`"
		const embed = new EmbedBuilder()
		embed.setColor(defaultembedcolour)
		embed.setFooter({ text: defaultfootertext})
		embed.setTitle("Credits!")
		embed.setDescription(description)
		embed.setTimestamp()
		messageCreate.channel.send({ embeds: [embed] }).catch((error) =>{
			console.error("error", error)
			return messageCreate.channel.send(reject.ExecutionError)
		})
	}
}
