const { Modal, TextInputComponent, SelectMenuComponent, showModal } = require('discord-modals'); // Import all

module.exports = {
    name: "interactionCreate",
    async execute(client, interaction) {
		if (interaction.customId.includes("submitReport")) {
			try {
				const userid = interaction.customId.replace("submitReport", "").split("|")[0]
				if (interaction.user.id !== userid) {
					return await interaction.reply({ content:`Only the message author can submit this report!`, ephemeral:true })
				}

				const modal = new Modal()
					.setCustomId(`domainReport`)
					.setTitle('Submit Domain Report')
					.addComponents(
					new TextInputComponent()
						.setCustomId('domain')
						.setLabel('Domain')
						.setStyle('SHORT')
						.setRequired(true),

					new SelectMenuComponent()
						.setCustomId('reason')
						.setPlaceholder('Domain report reason')
						.addOptions(
							{
								label: "Phishing Link",
								description: "Sites that attempt to steal personal details",
								value: "PHISHING",
								emoji: "🎣"
							},
							{
								label: "Malware",
								description: "Sites that contain malware",
								value: "MALWARE",
								emoji: "🦠"
							},
							{
								label: "Other",
								description: "If the option you need is not listed, choose this.",
								value: "OTHER",
								emoji: "❓"
							}
						),
					new TextInputComponent()
						.setCustomId('extra')
						.setLabel('Additional Information')
						.setPlaceholder("Put anything else which may be helpful here!")
						.setStyle('LONG')
					);
				showModal(modal, {
					client: client,
					interaction: interaction
				});
			}
			catch (err) {
				console.log(`Error: ${err}`)
			}

		}
		else if (interaction.customId.includes("cancelReport")) {
			const toSplit = interaction.customId.replace("cancelReport", "").split("|")
			const userid = toSplit[0]
			if (interaction.user.id !== userid) {
				return await interaction.reply({ content:`Only the message author can submit this report!`, ephemeral:true })
			}
			await interaction.message.delete()
		}
    }
}
