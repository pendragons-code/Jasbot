const { OwnerID } = require("../../../config.json")
module.exports = (Jasbot, error) => {
	console.error("Error!", error)
	Jasbot.users.cache.get(OwnerID).send(`\`${error}\``)
}
