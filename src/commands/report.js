const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
	name: "report",
	usage: "report",
	description: "Submit a domain report!",
	async execute(client, message, args) {
		let embed = new MessageEmbed()
			.setDescription(
				`Want to report a domain? Click the button below to report a domain to Fishfish.gg!`,
			)
			.setColor("ffffff");
		let row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId(`submitReport${message.author.id}`)
					.setLabel("Report Domain")
					.setStyle("SUCCESS"),
			)
			.addComponents(
				new MessageButton()
					.setCustomId(`cancelReport${message.author.id}`)
					.setLabel("Dismiss")
					.setStyle("DANGER"),
			);

		const msg = await message.channel.send({ embeds: [embed], components: [row] });
	},
};
