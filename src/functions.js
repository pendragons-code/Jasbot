function cm(a){
	let inches = a / 2.54
	let feet = a / 30.48
	let kilometers = a / 100000
	let meters = a / 100
	let yards = a / 91.44
	return `${inches.toPrecision(5)} inches \n${feet.toPrecision(5)} feet \n${yards.toPrecision(5)} yards \n${meters.toPrecision(5)} meters/metres \n${kilometers.toPrecision(5)} kilometers/kilometres`
}
function feet(a){
	let cm = a * 30.48
	let meters = (a * 30.48) / 100
	let kilometers = (a * 30.48) / 100000
	let inches = a * 12
	let yards = a / 3
	return `${inches.toPrecision(5)} inches \n${yards.toPrecision(5)} yards \n${cm.toPrecision(5)} centimeters/centimetres \n${meters.toPrecision(5)} meters/metres \n${kilometers.toPrecision(5)} kilometers/kilometres`
}
function inches(a){
	let cm = a * 2.54
	let foot = a / 12
	let yards = a / 36
	let meters = a / 39.37
}
function yards(a){
}
function kilometers(a){
}
function meters(a){
}

module.exports = { cm: cm, meters: meters, kilometers: kilometers, yards: yards, feet: feet, inches: inches }
