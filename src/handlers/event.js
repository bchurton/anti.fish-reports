const { walkFiles, handleFromFilePaths } = require("./handler");

const loadEvents = (client, eventDir) => {
	const filePaths = walkFiles(eventDir);

	const handle = (event) => {
		client.on(event.name, (...args) => event.execute(client, ...args));
	};

	handleFromFilePaths(filePaths, handle);
};

module.exports = {
	loadEvents,
};
