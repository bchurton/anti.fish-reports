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

// client.on("messageCreate", async (message) => {
// 	if (message.author.bot) return;
// 	if (
// 		!message.content.startsWith("<@" + client.user.id + ">") &&
// 		!message.content.startsWith("<@!" + client.user.id + ">") &&
// 		!message.content.startsWith(prefix)
// 	) {
// 		return;
// 	}
// 	let split = message.content.split(" ");
// 	let search = split[1];
// 	if (message.content.startsWith(prefix)) search = split[0].slice(prefix.length);
// 	let command =
// 		client.commands.get(search) ||
// 		client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(search));
// 	let i = 1;
// 	if (message.content.startsWith(prefix)) i++;
// 	while (i <= 2) {
// 		i++;
// 		split.shift();
// 	}
// 	try {
// 		await command.execute(client, message, split);
// 	} catch {}
// });

client.login(config.discordToken);
