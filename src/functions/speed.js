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

module.exports = { Knot, KilometerPerHour, FootPerSecond, MilesPerHour, MetersPerSecond }
