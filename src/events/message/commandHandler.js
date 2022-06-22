const { printError } = require("../../utils/console");
const constants = require("../../constants");
const config = require("../../config");

const extractPrefixFromContent = (content) => {
	if (content.startsWith(config.commandPrefix)) {
		const prefixLength = config.commandPrefix.length;
		return content.slice(prefixLength);
	}

	const mentionMatch = content.match(constants.mentionPrefixRegex);
	if (!mentionMatch || !mentionMatch[0]) return null;

	const prefixLength = mentionMatch[0].length;
	return content.slice(prefixLength);
};

module.exports = {
	name: "messageCreate",
	async execute(client, message) {
		if (message.author.bot) return;

		const content = extractPrefixFromContent(message.content);
		if (!content) return;

		const [commandName, ...args] = content.trim().split(/\s+/);

		const command =
			client.commands.get(commandName) ||
			client.commands.find((command) => command.aliases?.includes(commandName));

		if (!command) return;

		try {
			await command.execute(client, message, args);
		} catch (error) {
			printError(error);
		}
	},
};
