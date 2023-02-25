const { db } = require("../../../loaders/bot.js")
const { EmbedBuilder } = require("discord.js")
const { Bot, Default } = require("../../../../config.json")
module.exports = {
	name: "blacklist",
	aliases: [],
	category: "creator",
	utilisation: "blacklist <@user> <on/off/check>",
	desc: "Blacklists user from discord bot!",
	async execute(bot, messageCreate, args, mainPrefix) {}
}
