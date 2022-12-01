const { db } = require("../../Loaders/Jasbot.js")
async function warn(user, reason, moderator) {
	await db.add(`warncount_${messageCreate.guild.id}_${user.id}`, 1)
	let warncount = await db.get(`warncount_${messageCreate.guild.id}_${user.id}`)
	await db.set(`warn_${warncount}_${messageCreate.guild.id}_${user.id}`, [reason, moderator.id])
}
async function unwarn(user, reason, modetator) {
	await db.add(`unwarncount_${messageCreate.guild.id}_${user.id}`, 1)
	let unwarncount = await db.get(`unwarncount_${messaegCreate.guild.id}_${user.id}`)
	await db.set(`unwarn_${unwarncount}_${messageCreate.guild.id}_${user.id}`, [reason, moderator.id])
}
module.exports = { warn, unwarn }
