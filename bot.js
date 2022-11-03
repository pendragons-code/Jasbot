const { Client, GatewayIntentBits, Collection } = require("discord.js")
const bot = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildScheduledEvents,
		GatewayIntentBits.GuildVoiceStates
	]
});
const { QuickDB } = require('quick.db');
const moderationdb = new QuickDB({ filePath: 'DataBase/Moderation.sqlite' })
const guildconfigdb = new QuickDB({ filePath: 'DataBase/GuildConfig.sqlite' })
const userdb = new QuickDB({ filePath: 'DataBase/User.sqlite' })
const botconfigdb = new QuickDB({ filePath: 'DataBase/botconfig.sqlite' })
bot.commands = new Collection()
bot.structures = new Collection()
module.exports = { bot, moderationdb, guildconfigdb, userdb, botconfigdb }
