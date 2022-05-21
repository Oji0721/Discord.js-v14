const { EmbedBuilder } = require("discord.js");
const { Command } = require('../../structures/functions/Command');

module.exports = new Command({
    name: "ping",
    description: "Returns a WebSocket ping.",
    type: 1,
    cooldown: 10000,
    options: [
      {
        name: 'ephemeral',
        description: 'Do you want to do the message ephemeral?',
        type: 5,
      }
    ],

    run: async (interaction, client) => {
      const ephemeral = interaction.options.getBoolean('ephemeral');
      const pongMessage = await interaction.reply({ content: '⠀', fetchReply: true, ephemeral: ephemeral })
        const embed = new EmbedBuilder()
      .setAuthor({ name: '🏓 Pong!'})
      .setColor(client.color.mainColor)
      .setDescription(`Bots Ping: ${client.ws.ping}ms!\nApi Ping: ${pongMessage.createdTimestamp - interaction.createdTimestamp}ms!`)
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      return await interaction.editReply({ embeds: [embed] })
    }
})
