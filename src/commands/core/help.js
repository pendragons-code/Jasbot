const { EmbedBuilder, PermissionsBitField } = require("discord.js")
module.exports = {
	name: "help",
	aliases: ["commands", "-h"],
	category: "core",
	utilisation: "help <category/command name>",
	desc: "Provides details and list of commands!",
	async execute(bot, messageCreate, args, prefix){
		const commander = bot.commands.filter(x => x.showHelp !== false)
		let cater = bot.commands.map(u => u.category)
		let cats = []
		cater.forEach((element)=> {
			if(!cats.includes(element)) cats.push(element)
		})
		if(!args[0]){
			let helpembed = new EmbedBuilder()
			helpembed.setColor("#0099ff")
			helpembed.setTitle("˜”°•.˜”°•--==++List of commands!++==-- •°”˜.•°”˜")
			helpembed.setDescription(`Prefix is ${prefix}! This bot has ${commander.size} commands!`)
			helpembed.addFields(
			  { name: `Available commands!`, value: "`"+ prefix + " help <category>" + "`" + "\n\n" + "`"  + cats.join("`, `") + "`", inline: true },         
			)
		    helpembed.setTimestamp( new Date().getTime())
		    helpembed.setFooter({text:"Follow the dev on instagram!: @pendragonscode"})
			return messageCreate.channel.send({ embeds: [helpembed] })
		}
		if(cats.includes(args[0])=== true){
			let commands = bot.commands.filter(command => command.category === args[0])
			let embed = new EmbedBuilder()
			embed.setTitle("˜”°•.˜”°•--==++List of commands!++==-- •°”˜.•°”˜")
			embed.setDescription(`Prefix is ${prefix}! This bot has ${commander.size} commands!`)
			embed.addFields(
			  { name: `Available commands!`, value: "`"+commands.map(cmd => cmd.name).join("`, `")+"`", inline: true },         
			)
		    embed.setColor('#0099ff')
		    embed.setTimestamp( new Date().getTime())
		    embed.setFooter({text:"Follow the dev on instagram!: @pendragonscode"})
		    messageCreate.channel.send({ embeds: [embed] })
		}
		if(args[0] && cats.includes(args[0]) === false){
			const command = messageCreate.client.commands.get(args.join(" ").toLowerCase()) || messageCreate.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));
		  if (!command) return messageCreate.channel.send(`I did not find this command !`);
		  let embed2 = new EmbedBuilder()
			embed2.setTitle("Help Center!")
			embed2.setColor("#0099ff")
			embed2.setFooter({text:"Pls suggest features if you can!"})
			embed2.addFields(
				{ name: 'Name', value: command.name, inline: true },
				{ name: 'Category', value: command.category, inline: true },
				{ name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
				{ name: 'Utilisation', value: command.utilisation.replace('{prefix}', prefix), inline: true }, 
				{ name: 'Description',  value: command.desc.replace('{prefix}', prefix)})
			embed2.setTimestamp()
			embed2.setDescription( 'Have fun!')
		  
		  messageCreate.channel.send({embeds: [embed2]});   }
	}
}
