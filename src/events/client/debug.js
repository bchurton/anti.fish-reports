module.exports = {
	name: "debug",
	execute(_client, info) {
		// TODO: config option to toggle this
		printDebug(info);
	},
};
