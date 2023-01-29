const malScraper = require("mal-scraper")
async function banana() {
	let result = await malScraper.getInfoFromName("nisekoi")
	console.log(result)
}
banana()
