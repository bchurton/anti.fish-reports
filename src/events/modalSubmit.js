const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { printError } = require("../utils/console");
const config = require("../config");
const axios = require("axios");

module.exports = {
	name: "modalSubmit",
	async execute(_client, modal) {
		const domain = modal.getTextInputValue("domain");
		const reason = modal.getSelectMenuValues("reason")[0];
		const extra = modal.getTextInputValue("extra");

		const reportReason = [
			`Reported by \`${modal.user.username}#${modal.user.discriminator}\` via the Anti.fish API server.`,
			`Report reason: ${reason}`,
			`\nAdditional details: ${extra}`,
		].join("\n");

		const { data } = await axios
			.post(
				`https://${config.submitReportDomain}/phish/report`,
				{
					url: domain,
					reason: reportReason,
				},
				{
					headers: {
						authorization: config.submitReportAuthorization,
						"Content-Type": "application/json",
					},
				},
			)
			.catch((error) => {
				if (error.isAxiosError) {
					printError(
						`[status: ${error.response?.status}]: ${JSON.stringify(error.response?.data ?? {})}`,
					);
				} else {
					printError(error);
				}

				return {
					data: {
						accepted: false,
						reason: error.response?.data?.reason ?? "Unknown reason",
					},
				};
			});

		if (data.accepted) {
			const embed = new MessageEmbed()
				.setDescription(`Successfully reported **${domain}** to fishfish.gg!`)
				.setFooter({ text: `Reported by ${modal.user.username}#${modal.user.discriminator}` })
				.setColor("03962a");

			const actionRow = new MessageActionRow()
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

			return modal.message.edit({
				embeds: [embed],
				components: [actionRow],
			});
		}

		const embed = new MessageEmbed()
			.setDescription(`An error occured whilst reporting **${domain}**!\n**"${data.reason}"**`)
			.setColor("ad071a");

		await modal.reply({
			content: `An error occured whilst reporting **${domain}**.\n**${data.reason}**`,
			ephemeral: true,
		});

		return modal.message.edit({ embeds: [embed], components: [] });
	},
};
