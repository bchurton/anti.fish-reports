const { printError } = require("./utils/console");

process.on("uncaughtException", (error) => {
	console.error(printError(error));
});

process.on("unhandledRejection", (error) => {
	console.error(printError(error));
});

process.on("SIGINT", () => {
	Sentry.captureMessage("Received SIGINT signal, exiting...", Sentry.Severity.Info);
	process.exit(0);
});
