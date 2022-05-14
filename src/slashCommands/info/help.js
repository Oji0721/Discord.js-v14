const { Client, ChatInputCommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "help",
    description: "List of the commands.",
    type: ApplicationCommandType.ChatInput,
    /**
     *
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
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
      .setColor('#906FED')
      .setDescription('Choose something to see some commands!');
      await interaction.reply({ embeds: [embed], components: [row] });
      setTimeout(() => interaction.editReply({ embeds: [embed], components: [row2] }), 60000)
    }
}