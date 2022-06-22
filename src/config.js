const discordToken = process.env.DISCORD_TOKEN;
const commandPrefix = process.env.COMMAND_PREFIX;
const debug = process.env.DEBUG === "true";
const repositoryUrl = process.env.REPOSITORY_URL;

module.exports = {
	discordToken,
	commandPrefix,
	debug,
	repositoryUrl,
};
