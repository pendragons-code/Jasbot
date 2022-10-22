const {moderationdb, guildconfigdb} = require("../bot")

// distance
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
// volume
// speed

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
// weight
// Finding Area
// Finding volume
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
		return client.users.cache.get(mention);
	}
}

async function warn(user, reason, moderator){
	let warncount = await  moderationdb.get(`warncount_${messageCreate.guild.id}_${user.id}`)
	moderationdb.add(`warncount_${messageCreate.guild.id}_${user.id}`, 1)
	moderationdb.set(`warn_${warncount}_${messageCreate.guild.id}_${user.id}`, [`${reason}`, `${moderator.id}`])
	messageCreate.channel.send(`${user} was warned by ${moderator} for the following reason:\n${reason}`)
}

async function unwarn(user, reason, moderator){
	let unwarncount = await moderationdb.get(`unwarncount_${messageCreate.guild.id}_${user.id}`)
	moderationdb.add(`unwarncount_${messageCreate.guild.id}_${user.id}`, 1)
	moderationdb.set(`unwarn_${unwarncount}_${messageCreate.guild.id}_${user.id}`, [`${reason}`, `${moderator.id}`])
	messageCreate.channel.send(`${user} had 1 warn removed by ${moderator} for the following reason: \n${reason}`)
}


module.exports = { MetersPerSecond: MetersPerSecond, FootPerSecond: FootPerSecond, KilometerPerHour: KilometerPerHour, MilesPerHour: MilesPerHour, Knot: Knot, unwarn: unwarn, warn: warn, cm: cm, meters: meters, kilometers: kilometers, yards: yards, feet: feet, inches: inches, miles: miles, getUserFromMention: getUserFromMention, NullToZero: NullToZero}
