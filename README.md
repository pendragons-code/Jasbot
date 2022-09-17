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
npm start
```

# Future:

Advertising: I hope that I could raise some money to help people that lack the opportunity to learn how to code. Especially those that has displayed aptitude, only to be held back by lack of material.				

Through advertising, I intend to donate most of the money to climate change and UNICEF in order to help people everywhere. Yes, this would mean that I would still keep a portion of the money in order to save up for my education and stuff (I am just getting out of high school).					
Many people think that I am using the UNICEF and such organisations to gain more profit as a PR stunt, I would like to say that for I have been for a long time I have been advocating for open source education.				

The advertising would not be targetted. Meaning that it would literally be random.				

# Prod:
This repository is not the exact same as the prod version.				

Why? This is because I do not intend to open source the data. Not unless every single user is ok with that.					

Most importantly, the data and the types of data we track will be the same. This means we will primarily track the following with the purposes stated at the side.				

Actual data is held separately from the Machine hosting the bot and the data that I use is actually encrypted.					
```
[Guild IDs]: Used for saving server configurations.
[User IDs]: Used for saving personal configurations, warns, bans, kicks and more!

[Relevant commanding message]: 
	.catch(()=> {
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


random selection
core commands
anime commands
unixporn commands
utility commands
unit commands
scraper commands
creator commands


max-args features
```
