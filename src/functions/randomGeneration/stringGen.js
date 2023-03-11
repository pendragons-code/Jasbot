async function stringGen(length, set) {
	let result = ""
	for(var i = 0; i< length; ++i) {
		result += set.charAt(Math.floor(Math.random() * set.length))
	}
	return result
}
