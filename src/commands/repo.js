const { MessageEmbed } = require("discord.js");
const randomColor = require("../utils/randomColor");
const config = require("../config");

module.exports = {
	name: "repo",
	usage: "repo",
	description: "View the bot's GitHub repository!",
	async execute(_client, message, args) {
		const embed = new MessageEmbed()
			.setDescription(`You can view my GitHub repo [here](${config.repositoryUrl} "View the code")!`)
			.setColor(randomColor());

		return message.channel.send({
			embeds: [embed],
		});
	},
};
