const { printDebug } = require("../../utils/console");

module.exports = {
	name: "debug",
	execute(_client, info) {
		printDebug(info);
	},
};
