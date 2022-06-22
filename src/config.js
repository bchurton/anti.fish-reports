const discordToken = process.env.DISCORD_TOKEN;
const commandPrefix = process.env.COMMAND_PREFIX;
const debug = process.env.DEBUG === "true";

module.exports = {
	discordToken,
	commandPrefix,
	debug,
};
