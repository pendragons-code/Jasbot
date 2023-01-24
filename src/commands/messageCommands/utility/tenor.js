const env = require("dotenv").config()
const axios = require("axios")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { Default, Bot } = require("../../../../config.json")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "tenor",
	aliases: [],
	category: "utility",
	utilisation: "tenor <tag>",
	desc: "Sends 1 random result of the top 10 from the provided tag.",
	async execute(bot, messageCreate, args, mainPrefix) {
		const TenorKey = process.env.TenorKey
		let results = await axios({})
	}
}
