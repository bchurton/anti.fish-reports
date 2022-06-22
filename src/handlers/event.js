const { printDebug, printSuccess } = require("../utils/console");
const { walkFiles, handleFromFilePaths } = require("./handler");

const loadEvents = (client, eventDir) => {
	printDebug("Loading events...");

	const filePaths = walkFiles(eventDir);

	const handle = (event) => {
		client.on(event.name, (...args) => event.execute(client, ...args));
		printSuccess(`Loaded event '${event.name}'`);
	};

	handleFromFilePaths(filePaths, handle);

	printSuccess("Loaded events");
};

module.exports = loadEvents;
