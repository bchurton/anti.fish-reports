const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	name: "modalSubmit",
	async execute(client, modal) {
		const domain = modal.getTextInputValue("domain");
		const reason = modal.getSelectMenuValues("reason")[0];
		const extra = modal.getTextInputValue("extra");

		const response = await fetch("https://yuri.bots.lostluma.dev/phish/report", {
			method: "POST",
			body: JSON.stringify({
				url: domain,
				reason: `Reported by \`${modal.user.username}#${modal.user.discriminator}\` via the Anti.fish API server.\nReport reason: ${reason}\nAdditional details: ${extra}`,
			}),
			headers: {
				authorization: process.env.FISHFISH,
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();

		if (data.accepted) {
			let embed = new MessageEmbed()
				.setDescription(`Successfully reported **${domain}** to fishfish.gg!`)
				.setFooter({ text: `Reported by ${modal.user.username}#${modal.user.discriminator}` })
				.setColor("03962a");
			let row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId("submitReport")
						.setLabel("Report Domain")
						.setStyle("SUCCESS")
						.setDisabled(true),
				)
				.addComponents(
					new MessageButton()
						.setCustomId("cancelReport")
						.setLabel("Dismiss")
						.setStyle("DANGER")
						.setDisabled(true),
				);
			await modal.reply({
				content: `Successfully reported **${domain}** to fishfish.gg!`,
				ephemeral: true,
			});
			await modal.message.edit({ embeds: [embed], components: [row] });
		} else {
			let embed = new MessageEmbed()
				.setDescription(`An error occured whilst reporting **${domain}**!\n**"${data.reason}"**`)
				.setColor("ad071a");
			await modal.reply({
				content: `An error occured whilst reporting **${domain}**.\n**${data.reason}**`,
				ephemeral: true,
			});
			await modal.message.edit({ embeds: [embed], components: [] });
		}
	},
};
