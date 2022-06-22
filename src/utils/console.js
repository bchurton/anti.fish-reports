const config = require("../config");
const chalk = require("chalk");

const printSuccess = (text) => {
	console.log(chalk.green("SUCCESS"), text);
};

const printError = (text) => {
	console.error(chalk.red("ERROR"), text);
};

const printWarning = (text) => {
	console.warn(chalk.yellow("WARNING"), text);
};

const printDebug = (text) => {
	if (!config.debug) return;
	console.warn(chalk.grey("DEBUG"), text);
};

module.exports = {
	printSuccess,
	printError,
	printWarning,
	printDebug,
};
