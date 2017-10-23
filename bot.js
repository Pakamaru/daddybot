const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const package = require('./package.json');

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
    
    if(command === "selfdestruct") {
        message.channel.send("This message will self destruct in 10s!");
        setTimeout(function(){ message.delete(1000); }, 10000);
        setTimeout(function(){ message.channel.send("10"); }, 100);
        setTimeout(function(){ message.channel.send("9"); }, 1000);
        setTimeout(function(){ message.channel.send("8"); }, 2000);
        setTimeout(function(){ message.channel.send("7"); }, 3000);
        setTimeout(function(){ message.channel.send("6"); }, 4000);
        setTimeout(function(){ message.channel.send("5"); }, 5000);
        setTimeout(function(){ message.channel.send("4"); }, 6000);
        setTimeout(function(){ message.channel.send("3"); }, 7000);
        setTimeout(function(){ message.channel.send("2"); }, 8000);
        setTimeout(function(){ message.channel.send("1"); }, 9000);
        setTimeout(function(){ message.channel.send("0"); }, 10000);
        setTimeout(function(){ message.channel.bulkDelete(11); }, 10000);
        if(message.content === "This message will self destruct in 10s!") {
            setTimeout(function(){ message.delete(1000); }, 10000);
        }
    }
});

client.login(auth.token);
