const env = require("dotenv").config()
const start = require("./bot.js")
console.log("Initiating functions!")
start.commander()
start.eventer()
start.structurer()
start.bot.login(process.env.token)
process.traceDeprecation = true