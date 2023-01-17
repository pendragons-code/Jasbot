const env = require("dotenv").config()
const { loadHelper } = require("./src/loaders/helpers.js")
const { loadEvents } = require("./src/loaders/events.js")
const { loadMessageCommands } = require("./src/loaders/messageCommands.js")
const { loadSlashCommands } = require("./src/loaders/slashCommands.js")
const { bot } = require("./src/loaders/bot.js")
loadEvents()
loadHelper()
loadSlashCommands()
loadMessageCommands()
bot.login(process.env.token)
console.log(`Hanging on for dear life on: ${process.pid}`)
process.traceDeprecation = true
