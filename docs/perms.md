# permissions and how it works
```
Thing number 1

Instead of adding an if statement to figure out permissions in the bot, i decided to do this
name: "help"
alias and the other shit here...
minperms: [],
async execute() ... other shit here
min perms can be used like this as per documentation (https://discordjs.guide/popular-topics/permissions.html#checking-member-permissions)

to check if a user has kick OR ban

minperms: [PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers]


to check if user has kick AND ban:

minperms: [[PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers]]
```


It works this way because:

```
			if(minperms) for(let i = 0; i < minperms.length; i++) if(!messageCreate.member.permissions.has(minperms[i])){
      //This line makes it that it checks like this: member.permissions.has(PermissionsBitField.Flags.KickMembers)
      //PermissionsBitField.Flags.KickMembers is defined as minperms[i] in the cmd.minperms array
      //It will cycle through the array and return if the user does not fulfill the and or.
      //so this results in and logic using an array in an array because
      //if (member.permissions.has([PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers])) {
	    //  console.log('This member can kick and ban');
      //}
      
				const PermList = require("../../assets/items/permission.json")
        //thisline gets the json folder full of the key and values that are available, convering the numbers to the items
				
        let query = minperms[i]
				if(Array.isArray(minperms[i])) query = minperms[i][0]
				//filters out and or logic
        //let's say the item is an array:
        //kick and ban members in permission bits would be 2,4
        //but returning 2,4 would be weird
        //So to counter this: we take the first item of the 2nd array
        //and find the value from the key
        
        return messageCreate.channel.send(`${reject.MissingPerms} \`${PermList[query]}\``)
			}
```

But we would like to make some changes soon:

```
determining the size of the array and finding all of the permissions and returning something like this:

you need BanMembers and KickMembers


So i am not implementing this yet, because I am changing computers a code progress is really slow because of this.
```
