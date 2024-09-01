const reqEvent = event => require(`../Events/${event}`);

module.exports = client => {
    client.on("ready", () => reqEvent("Ready.js")(client));
    reqEvent("interactionCreate.js")(client)
}