const { Bot } = require("../../config.json")
module.exports = async ({ bot, interactionCreate }) => {
	return interactionCreate.reply({ content: Bot.BotSite, ephemeral: true})
}
