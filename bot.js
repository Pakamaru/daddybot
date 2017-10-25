const Discord = require('discord.js');
const sql = require("sqlite");
sql.open("./users.sqlite");
const client = new Discord.Client();
const auth = require('./auth.json');
const package = require('./package.json');
const data = require('./marryList.json');
const marryModule = require('./Modules/Marry.js');
const pointsModule = require('./Modules/Points.js');
const userBasedModule = require('./Modules/Userbased.js')

client.on('ready', () => {
    client.user.setGame("with little girls");
});

client.on('message', async message => {
    if(message.author.bot || message.content.indexOf(auth.prefix) !== 0 || message.channel.type === "dm") return;

    if(message.content.indexOf(auth.prefix) !== 0) return;

    const args = message.content.slice(auth.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    var commandsHelp = "```Commands:```";

    //MODULES LOAD HERE
    //COMMENT THEM TO TURN THEM OFF
    userBasedModule.userBased(client, message, args, command);
    commandsHelp+=userBasedModule.loadHelp();

    pointsModule.points(client, message, args, command);
    commandsHelp+=pointsModule.loadHelp();

    marryModule.marry(client, message, args, command);
    commandsHelp+=marryModule.loadHelp();

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

    if(command === "help") {
        commandsHelp+="";
        message.author.sendMessage(commandsHelp);
    }


});

client.login(auth.token);
