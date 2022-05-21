const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const { Command } = require('../../structures/functions/Command');

module.exports = new Command({
    name: "help",
    description: "List of the commands.",
    type: 1,
    cooldown: 60000,
  
    run: async (interaction, client) => {
      const row = new ActionRowBuilder()
      .addComponents([
        new SelectMenuBuilder()
        .setCustomId('help-components')
        .setPlaceholder('Help Commands...')
        .addOptions([
          {
            label: 'Info',
            emoji: 'ℹ️',
            description: 'Select this to saw some commands related to `info`!',
            value: 'info'
          },
          {
            label: 'Utils',
            emoji: '🛠',
            description: 'Select this to saw some commands related to `info`!',
            value: 'utils'
          }
        ])
      ]);
      const row2 = new ActionRowBuilder()
      .addComponents([
        new SelectMenuBuilder()
        .setCustomId('edited')
        .setPlaceholder('Help Commands...')
        .addOptions([
          {
            label: 'Info',
            emoji: 'ℹ️',
            description: 'Select this to saw some commands related to `info`!',
            value: 'info'
          },
          {
            label: 'Utils',
            emoji: '🛠',
            description: 'Select this to saw some commands related to `info`!',
            value: 'utils'
          }
        ])
      ]);
      const embed = new EmbedBuilder()
      .setAuthor({ name: 'Help', iconURL: 'https://cdn.lengolabs.com/qbot-icons/info.png' })
      .setColor(client.color.mainColor)
      .setDescription('Choose something to see some commands!');
      await interaction.reply({ embeds: [embed], components: [row] });
      setTimeout(() => interaction.editReply({ embeds: [embed], components: [row2] }).catch((err) => {}), 60000)
    }
})