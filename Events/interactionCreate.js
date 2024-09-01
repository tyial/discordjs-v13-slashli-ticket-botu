module.exports = client => {
    client.on("interactionCreate", int =>{if (int.isCommand()) client.slashInteractions.get(int.commandName)?.run(client, int)});
}  