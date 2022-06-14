const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "repo",
	usage: "repo",
	description: "View the bot's GitHub repository!",
    async execute(client, message, args) {
		console.log("recieved")
		try {
			let embed = new MessageEmbed()
				.setDescription(`You can view my GitHub repo [here](${process.env.repo})!`)
				.setColor(Math.floor(Math.random()*16777215).toString(16))
			await message.channel.send({ embeds:[embed] })
		}
		catch (err) {
			return message.channel.send(`\`\`\`\n${err}\`\`\``) //for development debugging
		}
		
	}
}
