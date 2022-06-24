const { printSuccess } = require("../../utils/console");

module.exports = {
	name: "ready",
	execute() {
		printSuccess(`Ready at ${new Date().toISOString()}`);
	},
};
