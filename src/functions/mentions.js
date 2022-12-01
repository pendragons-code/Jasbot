function getUserFromMention(mention) {
	if (!mention) return;
	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);
		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}
		return Jasbot.users.cache.get(mention);
	}
}

function getChannelFromMention(mention) {
	if(!mention) return
	if(mention.startsWith('#')){
		mention = mention.slice(1)
		if(mention.startswith("!")) mention = mention.slice(1)
		return Jasbot.users.cache.get(mention)
	}
}

module.exports = { getChannelFromMention, getUserFromMention }
