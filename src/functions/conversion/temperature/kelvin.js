async function convertKelvin(queriedTemperature) {
	let celsius = parseFloat(queriedTemperature) - 273.15
	let fahrenheit = celsius * 1.8 + 32
	return `celsius: ${celsius}\nfahrenheit: ${fahrenheit}`
}
module.exports = { convertKelvin }
