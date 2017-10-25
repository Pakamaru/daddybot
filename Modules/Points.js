this.points = function (client, message, args, command) {
    if(command === "test"){
        sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
            if (!row) {
                sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
            } else {
                let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
                if (curLevel > row.level) {
                    row.level = curLevel;
                    sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
                    message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
                }
                sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
            }
        }).catch(() => {
            console.error;
            sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
                sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
            });
        });
    }

    if (command === "level") {
        sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
            if (!row) return message.reply("Your current level is 0");
            message.reply(`Your current level is ${row.level}`);
        });
    } else

    if (command === "points") {
        sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
            if (!row) return message.reply("sadly you do not have any points yet!");
            message.reply(`you currently have ${row.points} points, good going!`);
        });
    }
}

this.loadHelp = function(){
    var commandsHelp =
    "\n```THIS IS THE POINTS PART IT'S UNSTABLE AND STILL IN PROGRESS```"+
    "\n- test (gives you points)"+
    "\n- level (Shows how many points you have)"+
    "\n- points (Shows what level you are)";
    return commandsHelp;
}