const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const package = require('./package.json');
const getter = require('booru-getter')

client.on('ready', () => {
    client.user.setGame("with little girls");
});

client.on('message', async message => {
    if(message.author.bot) return;

    if(message.content.indexOf(auth.prefix) !== 0) return;

    const args = message.content.slice(auth.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "ping"){
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
    }

    if(command === "say") {
        // makes the bot say something and delete the message. As an example, it's open to anyone to use.
        // To get the "message" itself we join the `args` back into a string with spaces:
        const sayMessage = args.join(" ");
        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
        message.delete().catch(O_o=>{});
        if(!sayMessage){
            message.channel.send("Please give me something to say you stupid bitch!");
        } else {
            // And we get the bot to say the thing:
            message.channel.send(sayMessage);
        }
    }
    
    if(command === "purge") {
        // This command removes all messages from all users in the channel, up to 100.

        // get the delete count, as an actual number.
        const deleteCount = parseInt(args[0], 10);

        // Ooooh nice, combined conditions. <3
        if(!deleteCount || deleteCount < 2 || deleteCount > 1000)
          return message.reply("Please provide a number between 2 and 1000 for the number of messages to delete");

        // So we get our messages, and delete them. Simple enough, right?
        const fetched = await message.channel.fetchMessages({count: deleteCount});
        message.channel.bulkDelete(fetched)
          .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }

    if(command === "daddy") {
        var parameter = args.slice(0).join(' ').toLowerCase();
        if(!parameter) {
            return message.reply("Sorry, but I can't give an answer to that buddy boy");
        }
        if(parameter === "i love you") {
            return message.channel.send("I love you too " + message.author);
        }
    }

    if(command === "avatar") {
        var parameter = args.slice(0).join(' ');
        if(!parameter) {
            return message.channel.send(message.author.avatarURL);
        }
        var member = message.mentions.members.first();
        if(!member){
            return message.reply("maybe an actual person would make sense?");
        }
        if(member.user.avatarURL == null){
            return message.reply("Sorry but this person doesn't have an avatar kiddo");
        }
        if(member){
            return message.channel.send("" + member.user.avatarURL);
        }
    }

    if(command === "stats"){
        var parameter = args.slice(0).join(' ');
        if(!parameter){
            return embededCard(message.author);
        }
        var member = message.mentions.members.first();
        if(!member){
            return message.reply("maybe an actual person would make sense?");
        }
        if(member){
            return embededCard(member);
        }
    }

    // if(command === "anime") {
    //     return ;
    //     var parameter = args.slice(0).join(' ').toLowerCase();
    //     var amount = parameter.slice(0);
    //     var tags = parameter.slice(0);
    //     if(isNaN(amount)){
    //         amount = 1;
    //     }
    //     //Searching by tags
    //     getter.get(1, 0, "brown_hair+-red*", (xml) =>{
    //         //work with XML here.
    //     })
    //
    //     //Retrieving a random image with matching tags
    //     getter.getRandom("brown_hair+red_shirt+-dress*", (url)=>{
    //         //do something with URL here
    //     })
    //
    //
    //
    //
    //     message.reply("ello");
    //     return message.channel.sendFile("", "http://safebooru.org/index.php?page=dapi&s=post&q=index&limit=1", null, "TEST");
    // }
    
    if(command === "help") {
        message.author.sendMessage("```Commands:"+
            "\n- help (Shows the commands and what they do in DM)"+
            "\n- ping (Shows the latency in ms that the msg has to be send)"+
            "\n- say [message to be send] (Sends a message of the input you give and deletes your message)"+
            "\n- purge [number between 2 and 1000] (Bulk deletes the last messages sent)"+
            "\n- daddy i love you (Show daddy some love and he will give some back!)"+
            "\n- avatar [optional user] (Shows your avatarurl with an empty parameter or shows someone else their avatarurl if you tag them)"+
            "```");
    }

    function embededCard(member) {
        message.channel.send({
            "embed": {
                "title": "this is the playercard of " + member,
                "description": "this supports [named links](https://discordapp.com) on top of the previously shown subset of markdown. ```\nyes, even code blocks```",
                "url": "https://discordapp.com",
                "color": 7135306,
                "timestamp": "2017-10-24T12:54:33.836Z",
                "footer": {
                    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
                    "text": "footer text"
                },
                "thumbnail": {
                    "url": "https://cdn.discordapp.com/embed/avatars/0.png"
                },
                "image": {
                    "url": "https://cdn.discordapp.com/embed/avatars/0.png"
                },
                "author": {
                    "name": "author name",
                    "url": "https://discordapp.com",
                    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
                },
                "fields": [
                {
                    "name": "🤔",
                    "value": "some of these properties have certain limits..."
                },
                {
                    "name": "😱",
                    "value": "try exceeding some of them!"
                },
                {
                    "name": "🙄",
                    "value": "an informative error should show up, and this view will remain as-is until all issues are fixed"
                },
                {
                    "name": "<:thonkang:219069250692841473>",
                    "value": "these last two",
                    "inline": true
                },
                {
                    "name": "<:thonkang:219069250692841473>",
                    "value": "are inline fields",
                    "inline": true
                }
                ]
            }
        });
    }
});

client.login(auth.token);
