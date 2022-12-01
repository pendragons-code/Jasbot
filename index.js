const env = require("dotenv").config()
const { AutoTasker } = require("./Loaders/AutoTask.js")
const { commander } = require("./Loaders/Commands.js")
const { structurer } = require("./Loaders/structures.js")
const { eventer } = require("./Loaders/events.js")
const { bot } = require("./bot.js")
AutoTasker()
commander()
structurer()
eventer()
bot.login(process.env.testtoken)
console.log(`Hanging out at process: ${process.pid}`)
process.traceDeprecation = true