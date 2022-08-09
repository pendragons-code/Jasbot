const { EmbedBuilder } = require("discord.js")
const { db } = require("../../../bot.js")
module.exports = {
	name: "help",
	aliases: ["commands", "-h"],
	category: "core",
	utilisation: "help <category/command name>",
	desc: "Provides details and list of commands!",
	async execute(bot, messageCreate, args){
		console.log("hi - help.js")
	}
}

/*
So I consulted some people if I should just put Discord and db (inclusive of items like the prefix as well) in the execute, but I found it to be slower for some reason. (we came up with some theories)
But really, you all should do what you want.

We also discussed if we should add some more items such as a permission check in the messageCreate, but since Jasbot was intended to be a simple bot without too many moderation features, we decide
but yes, I would recommend adding it in.
*/
