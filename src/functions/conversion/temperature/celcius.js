async function convertCelsius(queriedTemperature) {
	let kelvin = parseFloat(queriedTemperature) + 273.15
	let fahrenheit = (parseFloat(queriedTemperature) * 1.8) + 32
	return `kelvin: ${kelvin}\nfahrenheit: ${fahrenheit}`
}
module.exports = { convertCelsius }
