# This Repo
Is not a really good project and not something worth looking into. It is not well optimized and you should frankly invite other bots and not waste your time.

# Update:
Our coming features will focus on moderation and more, however, this will take a little longer to get this to be pushed onto the main bot as I am still trying to get this bot approved on top.gg.			


So you may be able to tell that I made some changes in `events/guild/messageCreate.js`
```
Thing number 1

Instead of adding an if statement to figure out permissions in the bot, i decided to do this
name: "help"
alias and the other shit here...
minperms: [],
async execute() ... other shit here

min perms can be used like this as per documentation (https://discordjs.guide/popular-topics/permissions.html#checking-member-permissions)
to check if user has BOTH kick and ban:
minperms: [[PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers]]


to check if user has EITHER kick OR ban:

minperms: [PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers]

in /docs this will be explained
```

# Jasbot:

This repository contains the open source version of Jasbot! It is poorly written as of now since this bot is made to be simple to use (mainly because I'm lazy, but yes I will work on it.).		
This repository is not yet fully done, therefore you should come back later and make suggestions if you can!		
		

```
git clone https://github.com/pendragons-code/Jasbot
```
enter the directory and run this to install all the packages:		
```
npm i && npm update
```

# Directions:
Enter the .env file and enter the API keys and discord bot tokens accordingly				
After Installing the packages you now just need to run the bot! You can do so by using:			
```
npm run deploy
```


# Prod:
This repository is not the exact same as the prod version.				

Why? This is because I do not intend to open source the data in the database. Not unless every single user is ok with that.					

Most importantly, the data and the types of data we track will be the same. This means we will primarily track the following with the purposes stated at the side.				

Actual data is held separately from the Machine hosting the bot and the data that I use is actually encrypted.					
```
[Guild IDs]: Used for saving server configurations.
[User IDs]: Used for saving personal configurations, warns, bans, kicks and more!

[Relevant commanding message]: 
	.catch(() =>{
		console.log(messageCreate.content)
		console.error()
		return messageCreate.channel.send(reject.ExecutionError)
	})

What this blob of code do?:
	This bunch of code makes it that the message content used to trigger the command will be logged only in the event of errors. Irrelevant messages and executions without errors would not be logged.


[Listening to specific messages]:
	Partials and react roles

[Listening to messages]:

Before I begin I would like to guarentee that I WILL NOT TRACK YOUR MESSAGES
This is primarily used for 2 things. Deleting messages with a list of swear words. I intend to make this configurable. So yes you can configure your own list of anti-swear words.
```
# Documentation:
Yes I was told that this bot is not the best documented bot so lmao.
Proper Documentation will come much later when there is an actual userbase.

# Errors
This thing was hastily put together with no consideration of stabiltiy yet. JK HAHA no. I just haven't got the time to test it yet so RIP.

# Development slowdown:
This repo will see less activity for now. Some shit got my ass really busy.

# Backups:
If you intend to make this backup system the main method for how you do yout things, I think it is ok for a small bot, but pls don't do it if you wanna grow big or something, just because this method works, does not mean it is good. Anyhow, this is not the backup system I use since the db is hosted on a different machine. For that, I get a bash script to copy the encrypted folder and files into a backup folder.

# What about moderation features!!!
So I should tell you this by now, I was transitioning from one pc to another and some files got lost on the way. Also this new PC is not the best with linux support which means i can only sit my ass down and wait for shit to happen. Yes while that means there are just a few files missing, which is not honestly a good reason why i am not able to rewrite the code, which I am doing so right now, there are some thing going on for me right now. That means on the system Priority table, I will have to put this project lower on the priority table.
