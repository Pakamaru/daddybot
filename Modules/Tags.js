this.tags = async function tags(client, message, args, command, Tags) {
    if (command === 'addtag') {
        const tagName = args.shift();
        const tagDescription = args.join(' ');
        if (!tagName || tagName === " ")
            return message.reply("please insert a valid name");
        if (!tagDescription || tagDescription === " ")
            return message.reply("please insert a valid description");
        try {
            // equivalent to: INSERT INTO tags (name, descrption, username) values (?, ?, ?);
            const tag = await Tags.create({
                name: tagName,
                description: tagDescription,
                username: message.author.username,
            });
            return message.reply(`Tag ${tag.name} added.`);
        }
        catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return message.reply('That tag already exists.');
            }
            return message.reply('Something went wrong with adding a tag.');
        }
    }
    else if (command === 'tag') {
        const tagName = args;

        // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
        const tag = await Tags.findOne({where: {name: tagName}});
        if (tag) {
            // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
            tag.increment('usage_count');
            return message.channel.send(tag.get('description'));
        }
        return message.reply(`Could not find tag: ${tagName}`);
    }
    else if (command === 'edittag') {
        const tagName = args.shift();
        const tagDescription = args.join(' ');

        // equivalent to: UPDATE tags (descrption) values (?) WHERE name='?';
        const affectedRows = await Tags.update({description: tagDescription}, {where: {name: tagName}});
        if (affectedRows > 0) {
            return message.reply(`Tag ${tagName} was edited.`);
        }
        return message.reply(`Could not find a tag with name ${tagName}.`);
    }
    else if (command === 'taginfo') {
        const tagName = args;

        // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
        const tag = await Tags.findOne({where: {name: tagName}});
        if (tag) {
            return message.channel.send(`${tagName} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count} times.`);
        }
        return message.reply(`Could not find tag: ${tagName}`);
    }
    else if (command === 'showtags') {
        // equivalent to: SELECT name FROM tags;
        const tagList = await Tags.findAll({attributes: ['name']});
        const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
        return message.channel.send(`List of tags: ${tagString}`);
    }
    else if (command === 'removetag') {
        const tagName = args;
        // equivalent to: DELETE from tags WHERE name = ?;
        const rowCount = await Tags.destroy({where: {name: tagName}});
        if (!rowCount) return message.reply('That tag did not exist.');

        return message.reply('Tag deleted.');
    }
}

this.loadHelp = function () {
    var commandsHelp =
        "\n```HERE YOU CAN DO ANYTHING WITH TAGS```"+
        "\n- tag [required name] (Shows the description of the tag)"+
        "\n- addtag [required name] [required description] (Creates a new tag with your description)"+
        "\n- edittag"+
        "\n- taginfo"+
        "\n- showtags"+
        "\n- removetag";
    return commandsHelp;
}