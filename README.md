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

# NEWS
Next versions will focus on making the bot more user friendly and using some moderation features.

YES THE DEFAULT ANTISWEAR IS IN THE `config.json` file. I will be updating that array tho.
```
Changes to units:

Due to many people finding the conversion features useful in particular, I have decided to divide the items even further and implement more items to convert like speed, volume and mass!
Meaning instead of:

├── units
│   ├── celsius.js
│   ├── cm.js
│   ├── fahrenheit.js
│   ├── feet.js
│   ├── inches.js
│   ├── kelvin.js
│   ├── kilometers.js
│   ├── meters.js
│   ├── miles.js
│   └── yards.js




It would look something like this:

├── temperature
│   ├── celsius.js
│   ├── fahrenheit.js
│   └── kelvin.js
```





# Directions:
Enter the .env file and enter the API keys and discord bot tokens accordingly				
After Installing the packages you now just need to run the bot! You can do so by using:			
```
npm run deploy
```

# Future:
Before you apply I must explain that I may or may not do this and if you apply for patreon, you will get the refund as the service has yet to start. The discord bot is not even verified and there isn't even an official server for it!

So I hate to do this, but writing and hosting Jasbot costs money + I am gonna donate the money that I may or may not make to charities.		
How does this work out? Ads are not targeted, meaning they are completely random. If you don't want ads, just host your own version of Jasbot. I don't intend to monetize this further. If you are interested to apply for ads when this bot get popular later, you can consider [patreon](https://www.patreon.com/Pendragonscode/membership)

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

# DataBase:
The current DataBase, [quick.db](https://github.com/plexidev/quick.db/issues/250), is made to be a quick and easy to use database system.				
This means that the in built features are relatively limited. This means that features like encrytion is not built in. I might consider the usage of encryption in this repo.				

I would like to use something like mongodb, but costs means that some people may not have it as an available option.			

# Coming Features:
Honestly too many to put here not gonna lie. Genuinely.					

That said, you should see these coming out soon!			

```
AFK features.
Giveaways, entry by rolls, reactions or everyone in the server.
Greeting new users and goodbyes when they leave.
Anti-swear
warn
ban
kick
More common moderation commands
```

# Sharding
Jasbot may not be my first discord bot, but it is the first personal one that I am letting go public and verified. Therefor I am looking to consider sharding only after verification happens.		
[Discord js docs about sharding](https://discordjs.guide/sharding/#when-to-shard)
[Discord js sharding example](https://github.com/discordjs/guide/tree/main/code-samples/sharding/getting-started)

# Verification
Will not come soon at all. This is because I am not yet 16 (by discord's standards) and will have to wait till late dec for attempt of verification.
Only after that, about next year january would I be cable to see some progress with verificationa and in turn things like sharing. Either that, or the situation changes and I use the teams features.

