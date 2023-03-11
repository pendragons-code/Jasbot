const env = require("dotenv").config()
const express = require("express")
const rateLimit = require("express-rate-limit")
const { join } = require("path")
const { readdirSync } = require("fs")
const port = process.env.port
module.exports = (bot) => {
	const app = express()
	app.set("view engine", "ejs")
	app.set("views", join(__dirname, "../../website/views"))
	app.use(express.static(join(__dirname, "../../website/public")))
	
	readdirSync("./src/website/PageLoader").forEach(dirs => {
		let pageLoaderFile = readdirSync(`./src/website/PageLoader/${dirs}`).filter(file => file.endsWith(".js"))
		for(const file of pageLoaderFile) {
			const { execute, name } = require(`../../website/PageLoader/${dirs}/${file}`)
			app.get(name, async (req, res) => {
				execute(req, res)
			})
		}
	})
	
	
	app.use(function(req, res) {
	    res.status(404).send("🍌, 404")
	});
	
	
	// RateLimiting
	const limiter = rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
		standardHeaders: true,
		legacyHeaders: false
	})
	
	app.use(limiter)
	app.listen(port, () => {
		console.log(`Listening to requests on http://localhost:${port} !\nHanging for dear life on process: ${process.pid}`);
	});
}
