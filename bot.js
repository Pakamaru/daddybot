const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const package = require('./package.json');

client.on('ready', () => {
    client.user.setGame("with little girls");
});

client.on('message', message => {
    if (message.content === 'ping') {
    message.reply('pong');
}
});

client.login(auth.token);
