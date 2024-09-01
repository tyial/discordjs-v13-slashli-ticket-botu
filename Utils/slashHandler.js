const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const {Collection} = require("discord.js")
const fs = require("fs")
const config = require("../Config.js");

module.exports = client => {
    client.slashInteractions = new Collection();

    let globalSlashCommands = [];
    let yüklenenSlash = []
    var sayi = 0

    fs.readdir("./Commands/", (err, files) => {
        if (err) return console.log(err);
        files.forEach(f => {
            if(!f) return;
            if(!f.endsWith(".js")) return;
            let cmd = require(`../Commands/${f}`);
            client.slashInteractions.set(cmd.name, cmd);
            globalSlashCommands.push(cmd.command);
            yüklenenSlash.push(cmd.name)
        })
        sayi += files.length
    });


    let rest = new REST({version: '9'}).setToken(config.Token);
    client.on("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id), {
                    body: globalSlashCommands
                },
            );
        } catch (error){
            return console.log(error)
        } 
    });
}

