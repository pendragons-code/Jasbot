// checks if element of array is number.

async function numberFilter(array) {
	return array.every(element => {
		return typeof element === "number"
	})
}
module.exports = { numberFilter }
