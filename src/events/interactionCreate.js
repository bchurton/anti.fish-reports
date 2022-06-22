const { Modal, TextInputComponent, SelectMenuComponent, showModal } = require("discord-modals");

const handleSubmitReport = (client, interaction, submitReportUserId) => {
	const interactionUserId = interaction.user.id;

	if (interactionUserId !== submitReportUserId) {
		return interaction.reply({
			content: `Only the message author can submit this report!`,
			ephemeral: true,
		});
	}

	const modal = new Modal()
		.setCustomId(`domainReport`)
		.setTitle("Submit Domain Report")
		.addComponents(
			new TextInputComponent()
				.setCustomId("domain")
				.setLabel("Domain")
				.setStyle("SHORT")
				.setRequired(true),

			new SelectMenuComponent() //
				.setCustomId("reason")
				.setPlaceholder("Domain report reason")
				.addOptions(
					{
						label: "Phishing Link",
						description: "Sites that attempt to steal personal details",
						value: "PHISHING",
						emoji: "🎣",
					},
					{
						label: "Malware",
						description: "Sites that contain malware",
						value: "MALWARE",
						emoji: "🦠",
					},
					{
						label: "Other",
						description: "If the option you need is not listed, choose this.",
						value: "OTHER",
						emoji: "❓",
					},
				),

			new TextInputComponent()
				.setCustomId("extra")
				.setLabel("Additional Information")
				.setPlaceholder("Put anything else which may be helpful here!")
				.setStyle("LONG"),
		);

	return showModal(modal, {
		client,
		interaction,
	});
};

const handleCancelReport = (interaction, cancelReportUserId) => {
	const interactionUserId = interaction.user.id;

	if (interactionUserId !== cancelReportUserId) {
		return interaction.reply({
			content: `Only the message author can submit this report!`,
			ephemeral: true,
		});
	}

	return interaction.message.deletable && interaction.message.delete();
};

module.exports = {
	name: "interactionCreate",
	async execute(client, interaction) {
		if (!interaction.isButton()) return;

		const submitReportUserId = interaction.customId.match(/(^submitReport)(\d+)/)?.[2];
		if (submitReportUserId) return handleSubmitReport(client, interaction, submitReportUserId);

		const cancelReportUserId = interaction.customId.match(/(^cancelReport)(\d+)/)?.[2];
		if (cancelReportUserId) return handleCancelReport(interaction, cancelReportUserId);
	},
};
