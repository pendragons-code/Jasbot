module.exports = {
	name: "help",
	description: "Sends out list of commands!",
	async execute({ bot, interactionCreate }) {
		interactionCreate.reply({ content: "Yes this should work!" })
	}
}
