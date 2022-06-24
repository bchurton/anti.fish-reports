require("dotenv/config");
require("./handle-exceptions");

const { Client, Intents, Collection } = require("discord.js");
const discordModals = require("discord-modals");
const loadCommands = require("./handlers/command");
const loadEvents = require("./handlers/event");
const config = require("./config");
const { join } = require("path");

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
	partials: ["MESSAGE", "CHANNEL"],
});

discordModals(client);

client.commands = new Collection();

const commandDir = join(__dirname, "commands");
const eventDir = join(__dirname, "events");

loadCommands(client, commandDir);
loadEvents(client, eventDir);

client.login(config.discordToken);
