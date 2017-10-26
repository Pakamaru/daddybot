this.staff = async function staff(client, message, args, command) {
    if (command === "purge") {
        // This command removes all messages from all users in the channel, up to 100.

        // get the delete count, as an actual number.
        const deleteCount = parseInt(args[0], 10);

        // Ooooh nice, combined conditions. <3
        if (!deleteCount || deleteCount < 2 || deleteCount > 1000)
            return message.reply("Please provide a number between 2 and 1000 for the number of messages to delete");

        // So we get our messages, and delete them. Simple enough, right?
        const fetched = await message.channel.fetchMessages({count: deleteCount});
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
}

this.loadHelp = function(){
    var commandsHelp =
        "\n```THIS IS ONLY FOR ADMINS AND PEOPLE WITH THE RIGHT ROLES```"+
        "\n- purge [number between 2 and 1000] (Bulk deletes the last messages sent) {totally wrong place, will fix that later}";
    return commandsHelp;
}