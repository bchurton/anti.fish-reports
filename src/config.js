const discordToken = process.env.DISCORD_TOKEN;
const commandPrefix = process.env.COMMAND_PREFIX;
const debug = process.env.DEBUG === "true";
const repositoryUrl = process.env.REPOSITORY_URL;
const submitReportDomain = process.env.SUBMIT_REPORT_DOMAIN;
const submitReportAuthorization = process.env.SUBMIT_REPORT_AUTHORIZATION;

module.exports = {
	discordToken,
	commandPrefix,
	debug,
	repositoryUrl,
	submitReportDomain,
	submitReportAuthorization,
};
