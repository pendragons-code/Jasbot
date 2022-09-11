# Jasbot
A poorly designed version of Jasbot.    
Not fully done! come back later!!   

clone the repo    
```
git clone https://github.com/pendragons-code/Jasbot
```

get into the directory and install all the packages   
```
npm i && npm update
```

have fun because i requested for it. (make a .env file, define token in there and start the runtime)    


lol yeah i was too lazy to make the console.log thing in bot.js look better and i know using multiple console.logs is not the smartest (too lazy to microoptimize everything) but whatever bro!
Should consider something like eslint...        
    As of now, I do not care about what you may choose to do with such terrible code written by myself.
    This might change depending on how things goes.


# advertising

Yes i will be advertising with this bot, i will be implementing some basic advertising in the server and the bot.       
Why am i doing this?        
1.) Personal gain, I will be honest, i am just a kid who got out of high school, i would like to prepare for the next level of educations           
2.) [Also this](https://help.unicef.org/?country=SG&gclid=Cj0KCQjw08aYBhDlARIsAA_gb0dKglzLKjs81QBdnLsIzXmEo8CxFeT_nLeL-4XE9jgDJ6eX3Biw-b4aAv8CEALw_wcB), many people think i'm doing this for a PR stunt. Ok yes, technically this is. But I would like to say that I have been supporting the open source education movement for a long time and would like to continue doing so by providing financial and cheaper stuff for children around the world. Many people ask how making tiny projects like this would help people and I understand that my output as of now is very little. I would like to emphasize that i will increase the stuff i put online to help people learn in the future.




# Security
The prod version will vary in some ways. However, we will not collect more data from you other than your discord id (for storing data, so we will store prefix, warns and stuff as such), guild id, the content of the message *THAT IS DIRECTLY RESPONSIBLE FOR RUNNING THE COMMAND* (banana => not logged, jas help => logged. We primarily do this when the bot crashes. refer to fig 1). We will make a list of all the data that we will be using and how it will be used. It should be noted that the bot will also target moderation, which means that the bot would end up using the guild precense, guild members and message content intents.
```
So some of the features would include:
greeting, goodbyes, afk channel, giveaway (entry by roles, reaction or everyone in the server)
anti-swear
warn ban kick
```        

Fig 1       
```
.catch(() => {
    console.log(messageCreate.content)
    console.error()
    return messageCreate.channel.send(reject.ExecutionError)
})

//This will be added to all commands soon!
```


The Bot will also be using a DB that is not stored in the same machine. So yes the code uses quickdb because I understand that people may not be able to use mongodb. At the same time the developers have added remote server connection with quick.db. Plus it seem that encryption might be added soon! (I'm really hoping it does.)






Coming features:

```
Conversion of units
More APIs
Moderation?
cool downs (Hey I'm hosting this, too much traffic tends to also be an issue.)
```
