const { printDebug, printSuccess } = require("../utils/console");
const { walkFiles, handleFromFilePaths } = require("./handler");

const loadCommands = (client, commandDir) => {
	printDebug("Loading commands...");

	const filePaths = walkFiles(commandDir);

	const handle = (command) => {
		client.commands.set(command.name, command.execute);
		printSuccess(`Loaded command '${command.name}'`);
	};

	handleFromFilePaths(filePaths, handle);

	printSuccess("Loaded commands");
};

module.exports = loadCommands;
