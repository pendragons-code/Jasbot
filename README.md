# Jasbot:

This repository contains the open source version of Jasbot! It is poorly written as of now since this bot is made to be simple to use (mainly because I'm lazy, but yes I will work on it.).		
This repository is not yet fully done, therefore you should come back later and make suggestions if you can!		
It should be noted that this bot is nothing special and is somewhat terrible in code, better programmers would do many things a lot more differently. I'm not that good when writing code so I guess I can only YOLO and experiment here.		

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

# Errors
This thing was hastily put together with no consideration of stabiltiy yet. JK HAHA no. I just haven't got the time to test it yet so RIP.
