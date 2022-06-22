const { printDebug } = require("../../utils/console");

module.exports = {
	name: "debug",
	execute(_client, info) {
		// TODO: config option to toggle this
		printDebug(info);
	},
};
