function kelvin(a) {
	let celsius = (parseFloat(a) - 273.15)
	let fahrenheit = (parseFloat(a) - 273.15) * 1.8 + 32
	let desc = `${a} kelvin(s) in equal to:\n${fahrenheit} fahrenheit\n${celsius} celsius`
	return desc
}

function celsius(a) {
	let kelvin = parseFloat(a) + 273.15
	let fahrenheit = (parseFloat(a) * 1.8) + 32
	let desc = `${a} degrees celsius is equal to:\n${kelvin} kelvin\n${fahrenheit} fahrenheit`
	return desc
}

function fahrenheit(a) {
	let kelvin = (parseFloat(a) - 32 ) * 5/9 + 273.15
	let celsius = (parseFloat(a) - 32 ) * 5/9
	let desc = `${a} degrees fahrenheit is equal to:\n${kelvin} kelvin \n${celsius} celsius`
	return desc
}

module.exports = { kelvin, fahrenheit, celsius }
