const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch")

module.exports = {
    name: "messageCreate",
    async execute(client, message) {
		try {
			if (message.author.bot) return
			if (message.channel.id !== "986332477842919494" || message.channel.id !== "899368265204269096") return
			const domainMatches = message.content.toLowerCase().match(/(?:[A-z0-9](?:[A-z0-9-]{0,61}[A-z0-9])?\.)+[A-z0-9][A-z0-9-]{0,61}[A-z0-9]/)
			if (!domainMatches) return
			const domain = domainMatches[0]
			
			const response = await fetch('https://anti-fish.bitflow.dev/check', { 
				method: 'POST', 
				body: JSON.stringify({ message:message.content }), 
				headers: {
					'User-Agent': 'Anti.fish Reports Bot',
					'Content-Type': 'application/json'
				} 
			});

			const data = await response.json();
			if (data.match) return

			let embed = new MessageEmbed()
				.setDescription(`Looks like **${domain}** isn't a known domain yet.\nWould you like to report it?`)
				.setColor("ffffff")
			let row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('submitReport')
					.setLabel('Report Domain')
					.setStyle('SUCCESS'),
			)
			.addComponents(
				new MessageButton()
					.setCustomId('cancelReport')
					.setLabel('Dismiss')
					.setStyle('DANGER'),
			)
			
			const msg = await message.channel.send({ embeds:[embed], components:[row] })
			client.messages[msg.id] = message.author.id
		}
		catch (err) {
			console.log(err)
		}
	}
}
