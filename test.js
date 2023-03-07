const { getCm } = require("./src/functions/conversion/distance/cm.js")
async function test(){
	console.log(await getCm(50))
}
test()
