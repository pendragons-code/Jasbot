module.exports = async (bot) => {
	const config = require("../../../config.json")
	const env = require("dotenv").config()
	const Creatorkey = process.env.Creatorkey
	const express = require("express")
	const app = express()
	const port = 8000
	const os = require("os-utils")
	const { moderationdb, userdb, guildconfigdb, botconfigdb } = require("../../../bot.js")
	app.get('/getmoderation', async (req, res) => {
		console.log(req)
		if(req.query.key != Creatorkey || !req.query.key) return res.send("YOU ARE NOT ALLOWED TO BE HERE!")
		if(!req.query.id)return res.send("provide string")
		let mod = await moderationdb.get(req.query.id)
		res.send(mod)
	})
	
	os.cpuUsage(function(v){
		const arr = [ 1,2,3,4,5,6,7,8,9,10 ]
		arr.reverse()
		const used = process.memoryUsage().heapUsed /1024 /1024
		let memory = `Approximate memory usage: ${Math.round(used * 100) / 100} MB`
		let desc = `Serving ${bot.users.cache.size} users and ${bot.guilds.cache.size} guilds <br> Process: ${process.pid}<br>CPU: ${Math.round(v * 100) / 100 }%<br> ${memory}`
		app.get('/usage', async (req, res) =>{
			if(req.query.key != Creatorkey || !req.query.key) return res.send("YOU ARE NOT ALLOWED TO BE HERE!")
			res.send(desc)
		})
	})

	app.get('/getuser', async (res, req) => {
		console.log(req)
		if(req.query.key != Creatorkey || !req.query.key) return res.send("YOU ARE NOT ALLOWED TO BE HERE!")
		if(!req.query.id)return res.send("provide string")
		let userdet = await userdb.get(req.query.id)
		res.send(userdet)
	
	})

	app.get('/getguildconfig', async (res, req) => {
		console.log(req)
		if(req.query.key != Creatorkey || !req.query.key) return res.send("YOU ARE NOT ALLOWED TO BE HERE!")
		if(!req.query.id)return res.send("provide string")
		let guildconf = await guildconfigdb.get(req.query.id)
		res.send(guildconf)
	
	})

	app.get('/getbotconfig', async (res, req) => {
		console.log(req)
		if(req.query.key != Creatorkey || !req.query.key) return res.send("YOU ARE NOT ALLOWED TO BE HERE!")
		if(!req.query.id)return res.send("provide string")
		let botconf = await botconfigdb.get(req.query.id)
		res.send(botconf)
	})
	
	app.get('/getconfigjsonclone', async (res, req) => {
		console.log(req)
		if(req.query.key != Creatorkey) return res.send("YOU ARE NOT ALLOWED TO BE HERE!")
		res.send(config)
	})
	
	app.listen(port)
}
