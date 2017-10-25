this.marry = function (client, message, args, command) {
    if(command === "hug"){
        var parameter = args.slice(0).join(' ').toLowerCase();
        if(!parameter)
            return message.channel.send(message.author + " is a loner and hugs himself :cry:");
        var member = message.mentions.members.first();
        if(!member)
            return message.channel.send(message.author+" is hugging their imaginary friend named: "+parameter);
        if(member)
            return message.channel.send("Awww, "+message.author+" is giving a warm hug to "+member.user);
    }

    if(command === "kiss"){
        var parameter = args.slice(0).join(' ').toLowerCase();
        if(!parameter)
            return message.channel.send(message.author + " is looking for someone to kiss!");
        var member = message.mentions.members.first();
        if(!member)
            return message.reply("Sorry buddy I can't help you out on this one.");
        if(member)
            return message.channel.send("OMG, "+message.author+" is giving a k-kiss?!!!? to "+member.user+"!!!!!");
    }

    if(command === "marrylist"){
        var list = "List of married people:\n";
        for(var i=0; i<data.users.length; i++){
            if(data.users[i].relation.married === "true" && data.users[i].relation.requested === "true"){
                list+=data.users[i].name+" :heart: "+data.users[i].relation.marriedTo;
            }
        }
        return message.channel.send(list);
    }

    if(command === "marry"){
        var parameter = args.slice(0).join(' ').toLowerCase();
        if(!parameter) {
            return message.reply("Are you just testing me out now? ...retard");
        }
        var member = message.mentions.members.first();
        if(!member) {
            return message.reply("You are so fucking autistic, oh my god!!!");
        }
        if(member){
            for(var i=0; i<data.users.length; i++){
                if(message.author.id == data.users[i].ID){
                    if(data.users[i].relation.married === "true"){
                        return message.reply("trying to cheat on ye partner huh, you fucking slut!");
                    }
                    if(data.users[i].relation.requestedOpen === "true"){
                        return message.reply("come on man... you already forgot that you proposed to someone already?");
                    }
                }
                if(member.user.id == data.users[i].ID) {
                    if (data.users[i].relation.married === "true") {
                        return message.reply("Sorry to ruin your dreams but " + member.user + " is already married to another person :frowning:")
                    }
                    if(data.users[i].relation.requestedOpen === "true"){
                        if(data.users[i].relation.requestedTo == message.author){
                            marry(message.author, member.user, "marry");
                        }
                        return message.reply("ha this person has a crush on someone else xD loooseerrrr!")
                    }
                }
            }
            marry(message.author, member.user, "request");
            return message.channel.send("Request has been sent...\n"+message.author+" wants to marry "+member.user);
        }
    }

    function marry(person__one, person__two, state){
        var d = new Date();
        var persononeid, persontwoid;
        for(var i=0; i<data.users.length; i++){
            if(person__one.id == data.users[i].ID) {
                persononeid = i;
            }
            if(person__two.id == data.users[i].ID) {
                persontwoid = i;
            }
        }
        if(state === "marry") {
            data.users[persononeid].relation.requestedTo = "";
            data.users[persononeid].relation.married = "true";
            data.users[persononeid].relation.marriedTo = person__two;
            data.users[persononeid].relation.marriedAt = d;
            data.users[persononeid].relation.requested = "true";
            data.users[persononeid].relation.openRequest = "false";

            data.users[persontwoid].relation.requestedTo = "";
            data.users[persontwoid].relation.married = "true";
            data.users[persontwoid].relation.marriedTo = person__one;
            data.users[persontwoid].relation.marriedAt = d;
            data.users[persontwoid].relation.requested = "false";
            data.users[persontwoid].relation.openRequest = "false";
        }
        if(state === "request"){
            message.reply("hello "+data.users[persononeid].relation.requested);
            data.users[persononeid].relation.requested = "true";
            data.users[persononeid].relation.requestedTo = person__two;
            data.users[persononeid].relation.openRequest = "true";
            message.reply("hello "+data.users[persononeid].relation.requested);
        }
    }
}

this.loadHelp = function(){
    var commandsHelp =
    "\n```THIS PART IS FOR THE NEW FEATURES MARRY COMMANDS```"+
    "\n- hug [optional user] (gives the person a hug or else, well you know what this bot does xD)"+
    "\n- kiss [optional user] (Does the same as the hug command but now you kiss the person!)"+
    "\n- marrylist (Shows a list of the married people on this server)"+
    "\n- marry [required user] (Sends a marry request to the user... Let's hope he/she answers it!)";
    return commandsHelp;
}