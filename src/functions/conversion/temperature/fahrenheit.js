async function convertFahrenheit(queriedTemperature) {
	let celsius = (parseFloat(queriedTemperature) - 32) * 5/9
	let kelvin = celsius + 273.15
	return `kelvin: ${kelvin}\ncelsius: ${celsius}`
}
module.exports = { convertFahrenheit }
