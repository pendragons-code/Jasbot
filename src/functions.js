const { moderationdb, bot } = require("../bot")
const os = require("os-utils")
function cm(a){
	let inches = a / 2.54
	let feet = a / 30.48
	let kilometers = a / 100000
	let meters = a / 100
	let yards = a / 91.44
	let miles = a / 160900
	return `${inches.toPrecision(5)} inches \n${feet.toPrecision(5)} feet \n${yards.toPrecision(5)} yards \n${miles.toPrecision(5)} miles \n${meters.toPrecision(5)} meters/metres \n${kilometers.toPrecision(5)} kilometers/kilometres`
}
function feet(a){
	let cm = a * 30.48
	let meters = (a * 30.48) / 100
	let kilometers = (a * 30.48) / 100000
	let inches = a * 12
	let yards = a / 3
	let miles = a / 5280
	return `${inches.toPrecision(5)} inches \n${yards.toPrecision(5)} yards \n${miles.toPrecision(5)} miles \n${cm.toPrecision(5)} centimeters/centimetres \n${meters.toPrecision(5)} meters/metres \n${kilometers.toPrecision(5)} kilometers/kilometres`
}
function inches(a){
	let cm = a * 2.54
	let foot = a / 12
	let yards = a / 36
	let meters = a / 39.37
	let kilometers = a / 39.37 / 1000
	let miles = a / 63360
	return `${foot.toPrecision(5)} feet \n${yards.toPrecision(5)} yards \n${miles.toPrecision(5)} miles \n${cm.toPrecision(5)} centimeters/centimetres \n${meters.toPrecision(5)} meters/metres \n${kilometers.toPrecision(5)} kilometers/kilometres`
}
function yards(a){
	let cm = a * 91.44
	let meters = a / 1.094
	let kilometers = 1094
	let foot = a * 3
	let inches = a * 36
	let miles = a / 1760
	return `${foot.toPrecision(5)} feet \n${inches.toPrecision(5)} inches \n${miles.toPrecision(5)} miles \n${cm.toPrecision(5)} centimeters/centimetres \n${meters.toPrecision(5)} meters/metres \n${kilometers.toPrecision(5)} kilometers/kilometres`

}
function kilometers(a){
	let cm = a * 100000
	let meters = a * 1000
	let foot = a * 3281
	let inches = a * 39370
	let miles = a / 1.609
	let yards = a * 1094
	return `${foot.toPrecision(5)} feet \n${inches.toPrecision(5)} inches \n${miles.toPrecision(5)} miles \n${cm.toPrecision(5)} centimeters/centimetres \n${meters.toPrecision(5)} meters/metres \n${yards.toPrecision(5)} yards`
}
function meters(a){
	let cm = a * 100
	let kilometers = a / 1000
	let foot = a * 3.281
	let inches = a * 39.37
	let yards = a * 1.094
	let miles = a / 1609
	return `${foot.toPrecision(5)} feet \n${inches.toPrecision(5)} inches \n${miles.toPrecision(5)} miles \n${cm.toPrecision(5)} centimeters/centimetres \n${yards.toPrecision(5)} yards \n${kilometers.toPrecision(5)} kilometers/kilometres`
}
function miles(a){
	let cm = a * 160900
	let meters = a * 1609
	let foot = a * 5280
	let inches = a * 63360
	let kilometers = a * 1.609
	let yards = a * 1760
	return `${foot.toPrecision(5)} feet \n${inches.toPrecision(5)} inches \n${yards.toPrecision(5)} yards \n${cm.toPrecision(5)} centimeters/centimetres \n${meters.toPrecision(5)} meters/metres \n${kilometers.toPrecision(5)} kilometers/kilometres`
}

function MetersPerSecond(a){
	let KilometerPerHour = a * 3.6
	let MilesPerHour = a * 2.237
	let FootPerSecond = a * 3.281
	let Knot = a * 1.944
	return `${KilometerPerHour.toPrecision(5)} Km/H\n${MilesPerHour.toPrecision(5)} Mile(s)/H\n ${FootPerSecond.toPrecision(5)} Feet or Foot/s\n ${Knot.toPrecision(5)} knots`
}

function MilesPerHour(a){
	let FootPerSecond = a * 1.467
	let MetersPerSecond = a / 2.236
	let KilometerPerHour = a * 1.609
	let Knot = a / 1.151
	return `${FootPerSecond.toPrecision(5)} Foot or Feet/s \n${MetersPerSecond.toPrecision(5)} M/s\n${KilometerPerHour.toPrecision(5)} Km/H\n${Knot.toPrecision(5)} knots`
}

function FootPerSecond(a){
	let MilesPerHour = a / 1.467
	let MetersPerSecond = a / 3.281
	let KilometerPerHour = a * 1.097
	let Knot = a / 1.688
	return `${MilesPerHour.toPrecision(5)} Mile(s)/H\n ${MetersPerSecond.toPrecision(5)} M/s\n ${KilometerPerHour.toPrecision(5)} Km/H\n${Knot.toPrecision(5)} knots`
}

function KilometerPerHour(a){
	let MilesPerHour = a / 1.609
	let FootPerSecond = a / 1.097
	let MetersPerSecond = a / 3.6
	let Knot = a / 1.852
	return `${MilesPerHour.toPrecision(5)} Mile(s)/H\n${FootPerSecond.toPrecision(5)} Foot or Feet /s\n${MetersPerSecond.toPrecision(5)} M/s\n${Knot.toPrecision(5)} knots`
}

function Knot(a){
	let MilesPerHour = a * 1.151
	let FootPerSecond = a * 1.688
	let MetersPerSecond = a / 1.944
	let KilometerPerHour = a * 1.852
	return `${MilesPerHour.toPrecision(5)} Mile(s)/H\n${FootPerSecond.toPrecision(5)} Foot or Feet/s\n${MetersPerSecond.toPrecision(5)} M/s\n${KilometerPerHour.toPrecision(5)} Km/H`
}

function degrees(a){
	let radian = a * (Math.PI/180)
	let gradian = a * (200/180)
	let Milliradian = a * (1000 * Math.PI/180) // Yes i could just divide radian to get milliradian out but lmao
	let MinuteOfArc = a * 60
	let SecondOfArc = a * 3600
	return `${radian.toPrecision(5)} rad\n ${gradian.toPrecision(5)} grad\n ${Milliradian.toPrecision(5)} mrad\n ${MinuteOfArc.toPrecision(5)} Minute Of Arc\n ${SecondOfArc.toPrecision(5)} Second Of Arc`
}

function radian(a){
	let degrees = a * (180/Math.PI)
	let gradian = a * (200/Math.PI)
	let Milliradian = a * 1000
	let MinuteOfArc = a * (60 * 180)/Math.PI
	let SecondOfArc = a * (3600 * 180)/Math.PI
	return `${degrees.toPrecision(5)} deg\n${gradian.toPrecision(5)} grad\n${Milliradian.toPrecision(5)} mrad\n${MinuteOfArc.toPrecision(5)} Minute Of Arc\n${SecondOfArc.toPrecision(5)} Second Of Arc`
}
//.toPrecision(5)
function gradian(a){
	let degrees = a * 180/200
	let radian = a * Math.PI/200
	let Milliradian = a * Math.PI/200 * 1000
	let MinuteOfArc = a * 54
	let SecondOfArc = a * 3240
	return `${degrees.toPrecision(5)} deg\n${radian.toPrecision(5)} rad\n${Milliradian.toPrecision(5)} mrad\n${MinuteOfArc.toPrecision(5)} Minute Of Arc\n${SecondOfArc.toPrecision(5)} Second Of Arc`
}

function milliradian(a){
	let degrees = a * 180/(1000 * Math.PI)
	let radian = a / 1000
	let gradian = a * 200/(1000 * Math.PI)
	let MinuteOfArc = a * (60 * 180)/(1000 * Math.PI)
	let SecondOfArc = a * (3600 * 180)/(1000 * Math.PI)
	return `${degrees.toPrecision(5)} deg\n${radian.toPrecision(5)} rad\n${gradian.toPrecision(5)} grad\n${MinuteOfArc.toPrecision(5)} Minute Of Arc\n${SecondOfArc.toPrecision(5)} SecondOfArc`
}

function MinuteOfArc(a){
	let degree = a / 60
	let radian = (a * Math.PI)/(60 * 180)
	let gradian = a / 54
	let Milliradian = (a * 1000 * Math.PI)/(60 * 180)
	let SecondOfArc = a * 60
	return `${degree.toPrecision(5)} deg\n${radian.toPrecision(5)} rad\n${gradian.toPrecision(5)} grad\n${Milliradian.toPrecision(5)} mrad\n${SecondOfArc.toPrecision(5)} Second Of Arc`
}

function SecondOfArc(a){
	let degree = a / 3600
	let radian = (a * Math.PI)/(180 * 3600)
	let gradian = a / 3240
	let Milliradian = (a * 1000 * Math.PI)/(180 * 3600)
	let MinuteOfArc = a / 60
	return `${degree.toPrecision(5)} deg\n${radian.toPrecision(5)} rad\n${gradian.toPrecision(5)} grad\n${Milliradian.toPrecision(5)} mrad\n${MinuteOfArc.toPrecision(5)} Minute Of Arc`
}

function NullToZero(a){
	if(a === null) a = 0
}

//Add if the item is missing just ignore.
function getUserFromMention(mention) {
	if (!mention) return;
	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);
		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}
		return bot.users.cache.get(mention);
	}
}

async function warn(user, reason, moderator){
	let warncount = await  moderationdb.get(`warncount_${messageCreate.guild.id}_${user.id}`)
	await moderationdb.add(`warncount_${messageCreate.guild.id}_${user.id}`, 1)
	await moderationdb.set(`warn_${warncount}_${messageCreate.guild.id}_${user.id}`, [`${reason}`, `${moderator.id}`])
	//messageCreate.channel.send(`${user} was warned by ${moderator} for the following reason:\n${reason}`)
}

async function unwarn(user, reason, moderator){
	let unwarncount = await moderationdb.get(`unwarncount_${messageCreate.guild.id}_${user.id}`)
	await moderationdb.add(`unwarncount_${messageCreate.guild.id}_${user.id}`, 1)
	await moderationdb.set(`unwarn_${unwarncount}_${messageCreate.guild.id}_${user.id}`, [`${reason}`, `${moderator.id}`])
	//messageCreate.channel.send(`${user} had 1 warn removed by ${moderator} for the following reason: \n${reason}`)
}

async function ProjectUsage(a){					
	const memused = `${Math.round((process.memoryUsage.rss() /1024 /1024) * 100) / 100} MB`
	const cpu = `CPU Usage: ${Math.round(a * 100) / 100} %`
	let details = `${memused}\n${cpu}`
	return details
}

module.exports = { ProjectUsage, unwarn, warn, getUserFromMention, NullToZero, SecondOfArc, MinuteOfArc, milliradian, gradian, radian, degrees, Knot, KilometerPerHour, FootPerSecond, MilesPerHour, MetersPerSecond, miles, meters, cm , kilometers, inches, feet, yards }
