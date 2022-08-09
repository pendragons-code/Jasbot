const fs = require('fs')
const Discord = require('discord.js')
const { Client } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const bot = new Client({ intents:  32767 });
bot.commands = new Discord.Collection();
bot.structures = new Discord.Collection();
function commander(){
console.log(`\x1b[32m%s`, "---------------------------------------------------------------------")
console.log(`\x1b[32m%s`, "⭕ Commands ⭕")
console.log(`\x1b[32m%s`, "---------------------------------------------------------------------")
fs.readdirSync('./src/commands').forEach(dirs => {
const commands = fs.readdirSync(`./src/commands/${dirs}`).filter(files => files.endsWith('.js'));
for (const file of commands) {
        const command = require(`./src/commands/${dirs}/${file}`);
        console.log(`\x1b[32m%s`, `Loading command ${file} from ${dirs} ✅!`);
        bot.commands.set(command.name.toLowerCase(), command);
    };
});
console.log(`\x1b[32m%s`, "---------------------------------------------------------------------")
}

function eventer() {
console.log(`\x1b[35m%s`, "---------------------------------------------------------------------")
console.log(`\x1b[35m%s`, "⭕ Events ⭕")
console.log(`\x1b[35m%s`, "---------------------------------------------------------------------")
fs.readdirSync('./events').forEach(dirs => {
const events = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'));
	for (const file of events) {
    	console.log(`\x1b[35m%s`,`Loading discord.js event ${file} ✅!`);
    	const event = require(`./events/${dirs}/${file}`);
    	bot.on(file.split(".")[0], event.bind(null, bot));
	};
})
console.log(`\x1b[35m%s`, "---------------------------------------------------------------------")
}

function structurer() {
console.log('\x1b[36m%s\x1b[0m', "---------------------------------------------------------------------")
console.log('\x1b[36m%s\x1b[0m', "⭕ Structures ⭕")
console.log('\x1b[36m%s\x1b[0m', "---------------------------------------------------------------------")
fs.readdirSync('./src/structure').forEach(dirs => {
    const structure = fs.readdirSync(`./src/structure/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of structure) {
            const structure = require(`./src/structure/${dirs}/${file}`);
            console.log('\x1b[36m%s\x1b[0m', `Loading additional component ${file} from ${dirs} ✅!`);
            bot.structures.set(structure.name.toLowerCase(), structure);
        };
      })
console.log('\x1b[36m%s\x1b[0m', "---------------------------------------------------------------------")
    }

module.exports = {eventer: eventer, commander: commander, structurer: structurer, bot: bot, db: db}
