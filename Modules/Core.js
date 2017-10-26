this.core = async function core(client, message, args, command) {
    if (command === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
    }

    if(command === "bug"){
        var parameter = args.slice(0).join(' ');
        if(!parameter){
            return message.reply("Please give information about the bug as detailed as possible");
        }
        if(parameter){

        }
    }
}

this.loadHelp = function(){
    var commandsHelp =
        "\n```IMPORTANT COMMANDS FOR THE BOT```"+
        "\n- help (Shows the commands and what they do in DM)"+
        "\n- ping (Shows the latency in ms that the msg has to be send)";
    return commandsHelp;
}