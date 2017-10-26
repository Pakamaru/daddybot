this.userBased = async function userBased(client, message, args, command) {
    if (command === "say") {
        // makes the bot say something and delete the message. As an example, it's open to anyone to use.
        // To get the "message" itself we join the `args` back into a string with spaces:
        const sayMessage = args.join(" ");
        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
        message.delete().catch(O_o => {
        });
        if (!sayMessage) {
            message.channel.send("Please give me something to say you stupid bitch!");
        } else {
            // And we get the bot to say the thing:
            message.channel.send(sayMessage);
        }
    }

    if(command === "daddy") {
        var parameter = args.slice(0).join(' ').toLowerCase();
        if(!parameter) {
            return message.reply("Sorry, but I can't give an answer to that buddy boy");
        }
        if(parameter === "i love you" || parameter === "ily") {
            return message.channel.send("I love you too " + message.author);
        }
    }

    if (command === "stats") {
        var parameter = args.slice(0).join(' ');
        if (!parameter) {
            return embededCard(message.author);
        }
        var member = message.mentions.members.first();
        if (!member) {
            return message.reply("maybe an actual person would make sense?");
        }
        if (member) {
            return embededCard(member.user);
        }
    }

    if (command === "avatar") {
        var parameter = args.slice(0).join(' ');
        if (!parameter) {
            return message.channel.send(message.author.avatarURL);
        }
        var member = message.mentions.members.first();
        if (!member) {
            return message.reply("maybe an actual person would make sense?");
        }
        if (member.user.avatarURL == null) {
            return message.reply("Sorry but this person doesn't have an avatar kiddo");
        }
        if (member) {
            return message.channel.send("" + member.user.avatarURL);
        }
    }

    function embededCard(m) {
        var person__ = m;
        var img__ = (person__.avatarURL);
        if (img__ == null) {
            img__ = "https://cdn.discordapp.com/embed/avatars/0.png";
        }
        return message.channel.send({
            embed: {
                color: 7135306,
                author: {
                    name: "This is the playercard of " + person__.username,
                    icon_url: "" + img__
                },
                title: "" + person__.username.toUpperCase(),
                thumbnail: {
                    url: "" + img__
                },
                image: {
                    url: "" + img__
                },
                fields: [
                    {
                        name: "Username:",
                        value: "" + person__.username
                    },
                    {
                        name: "UserID:",
                        value: "" + person__.id
                    },
                    {
                        name: "Account created:",
                        value: "" + person__.createdAt
                    },
                    {
                        name: "Usertag:",
                        value: "" + person__.tag
                    }
                ],
                timestamp: "2017-10-24T12:54:33.836Z",
                footer: {
                    icon_url: "" + img__,
                    text: "HERE COMES THE DATE OF JOIN OF THE GUILD"
                }
            }
        });
    }
}

this.loadHelp = function(){
    var commandsHelp =
        "\n```THESE ARE JUST GENERAL COMMANDS FOR USERS TO JUST HAVE SOME FUN```"+
        "\n- say [message to be send] (Sends a message of the input you give and deletes your message)"+
        "\n- daddy i love you (Show daddy some love and he will give some back!)"+
        "\n- avatar [optional user] (Shows your avatarurl with an empty parameter or shows someone else their avatarurl if you tag them)"+
        "\n- stats [optional user] (Shows your playercard / shows the tagged persons playercard)";
    return commandsHelp;
}