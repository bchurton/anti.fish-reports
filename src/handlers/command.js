const { walkFiles, handleFromFilePaths } = require("./handler");

const loadCommands = (client, commandDir) => {
	const filePaths = walkFiles(commandDir);

	const handle = (command) => {
		client.commands.set(command.name, command.execute);
	};

	handleFromFilePaths(filePaths, handle);
};

module.exports = {
	loadCommands,
};
