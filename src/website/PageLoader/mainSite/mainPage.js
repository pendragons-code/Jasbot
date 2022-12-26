module.exports = {
	name: "/",
	async execute(req, res) {
		res.render("index.ejs")
	}
}
