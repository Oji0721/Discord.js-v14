const { EmbedBuilder, CommandInteraction } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  
  async execute(interaction, client) {
  if (interaction.isSelectMenu()) {
    if(interaction.customId === 'help-components') {
    
    // [EMBEDS]
    const infoEmbed = new EmbedBuilder()
    .setAuthor({ name: 'Category: Info', iconURL: 'https://cdn.lengolabs.com/qbot-icons/info.png' })
    .addFields([
      {
        name: 'info',
        value: 'Returns a WebSocket ping.',
        inline: true
      },
      {
        name: 'help',
        value: 'List of the commands.',
        inline: true
      }
    ])
    .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
    .setColor(client.color.mainColor)
    .setTimestamp();
    await interaction.deferReply({ ephemeral: true })
    
    const value = interaction.values[0];
    if (value === 'info') {
      interaction.followUp({ embeds: [infoEmbed] });
    } else if (value === 'utils') {
      interaction.followUp({ content: `This category is under developing` })
    }
    }
  }
  }
}