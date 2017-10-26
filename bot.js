const Discord = require('discord.js');
const Sequelize = require('sequelize');
const client = new Discord.Client();
const auth = require('./auth.json');
const package = require('./package.json');
const data = require('./marryList.json');
const marryModule = require('./Modules/Marry.js');
const pointsModule = require('./Modules/Points.js');
const userBasedModule = require('./Modules/Userbased.js');
const staffModule = require('./Modules/Staff.js');
const tagModule = require('./Modules/Tags.js')

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'database.sqlite',
});
/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255),
 * description TEXT,
 * username VARCHAR(255),
 * usage INT
 * );
 */

const Tags = sequelize.define('tags', {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    description: Sequelize.TEXT,
    username: Sequelize.STRING,
    usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
});

client.once('ready', () => {
    Tags.sync();
});

client.on('ready', () => {
    client.user.setGame("#help for commands");
});

client.on('message', async message => {
    if(message.author.bot || message.content.indexOf(auth.prefix) !== 0 || message.channel.type === "dm") return;

    if(message.content.indexOf(auth.prefix) !== 0) return;

    const args = message.content.slice(auth.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const commandArgs = args.join(' ');
    var commandsHelp = "```Commands:```";

    //MODULES LOAD HERE
    //COMMENT THEM TO TURN THEM OFF
    userBasedModule.userBased(client, message, args, command);
    commandsHelp+=userBasedModule.loadHelp();

    // pointsModule.points(client, message, args, command);
    // commandsHelp+=pointsModule.loadHelp();

    marryModule.marry(client, message, args, command);
    commandsHelp+=marryModule.loadHelp();

    staffModule.staff(client, message, args, command);
    commandsHelp+=staffModule.loadHelp();

    tagModule.tags(client, message, args, command, Tags);
    commandsHelp+=tagModule.loadHelp();
















    if(command === "help") {
        commandsHelp+="";
        message.author.sendMessage(commandsHelp);
    }


});

client.login(auth.token);
