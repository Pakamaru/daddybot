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
    
    const args = message.content.slice(auth.prefix.length).trim().split(/ #/g);
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
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
});

client.login(auth.token);
