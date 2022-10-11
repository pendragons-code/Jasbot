const env = require("dotenv").config()
const { eventer, structurer, commander, bot } = require("./bot.js")
console.log("A terribly made discord bot.")
eventer()
structurer()
commander()
bot.login(process.env.token)
process.traceDeprecation = true
