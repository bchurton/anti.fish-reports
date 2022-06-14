const { Modal, TextInputComponent, SelectMenuComponent, showModal } = require('discord-modals'); // Import all

module.exports = {
    name: "interactionCreate",
    async execute(client, interaction) {
		if (interaction.customId === "submitReport") {
			try {
				const message = interaction.message
				const domain = message.embeds[0].description.toLowerCase().match(/(?:[A-z0-9](?:[A-z0-9-]{0,61}[A-z0-9])?\.)+[A-z0-9][A-z0-9-]{0,61}[A-z0-9]/)[0]

				const modal = new Modal()
					.setCustomId('reportModal')
					.setTitle('Submit Domain Report')
					.addComponents(
					new TextInputComponent()
						.setCustomId('domain')
						.setLabel('Domain')
						.setStyle('SHORT')
						.setDefaultValue(domain)
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
		else if (interaction.customId === "cancelReport") {
			await interaction.message.delete()
		}
    }
}
