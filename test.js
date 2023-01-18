const axios = require("axios")
const { Default } = require("./config.json")
async function banana() {
	axios({
		method: "get",
		url: "https://some-random-api.ml/lyrics?title=$",
		headers: {
			"Content-Type": "application/json",
			"Accept-Encoding": "gzip,deflate,compress"
		}
	}) .then((result) => {
		for(i = 0; i < Default.DefaultBannedWords.length; ++i){
			if(result.data.lyrics.includes(Default.DefaultBannedWords[i])) console.log("hit")
		}
	})
}
banana()
