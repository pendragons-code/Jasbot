async function getChannelFromMention(mentionedChannel) {
	if(!mentionedChannel) return
	if(mentionedChannel.startsWith("#")) {
		mention = mention.slice(1, 0)
		return message.guild.channels.cache.get(mention)
		// the channel cannot be mention upon deletion and channels with ! will point to voice channels!
	}
}

module.exports = { getChannelFromMention }
