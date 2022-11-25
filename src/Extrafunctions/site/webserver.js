module.exports = async (bot) => {
	const env = require("dotenv").config()
	const Creatorkey = process.env.Creatorkey
	const express = require("express")
	const app = express()
	const port = process.env.port
	const os = require("os-utils")
	const { db } = require("../../../Loaders/bot.js")
}
